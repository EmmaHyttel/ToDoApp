import { Alert, Button, View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { useEffect, useState } from "react";

function ImagePicker({onImagePicked, initialImage = null}) {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    if (initialImage) {
    setPickedImage(initialImage);
    }
  }, [pickedImage]);

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Du har ikke givet tilladelse til at bruge kameraet.",
        "Giv tilladelse i indstillingerne for at bruge kameraet."
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    try {
      const hasPermission = await verifyPermissions();

      if (!hasPermission) return;

      const imageResult = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9], // noget med størrelsen, skal måske tilpasses min to-do apps design - men ved endnu ikke hvordan det skal være
        quality: 0.5,
      });

      const imageContent = imageResult.assets[0]; // tilgår det første item i assets arrayet fra imageResult

      console.log("Image picker result:", imageResult.assets[0].uri);

      if (!imageContent.canceled && imageContent.uri) {
        setPickedImage(imageContent.uri);
        if (onImagePicked) {
          onImagePicked(imageContent.uri); // Kald callback-funktionen med den valgte billed-URI
        }
      } else {
        console.log("Billedet blev annulleret eller ingen URI fundet.");
      }
    } catch (error) {
      console.error("Fejl ved optagelse af billede:", error);
      Alert.alert("Der opstod en fejl under optagelse af billedet.");
    }
  }

  let imagePreview = <Text>Intet billede taget endnu.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Tag billed" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4d0ff",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
