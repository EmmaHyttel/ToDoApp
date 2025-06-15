import { Alert, Button, View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { useEffect } from "react";

function ImagePicker({ image, onImagePicked }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    console.log("Valgt billede:", image);
  }, [image]);

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

      if (!imageResult.canceled && imageResult.assets?.length > 0) {
        const imageAsset = imageResult.assets[0];
        if (onImagePicked) {
          onImagePicked(imageAsset.uri); // Sender Uri til parent
        }
        console.log("Billedet blev taget:", imageAsset.uri);
      } else {
        console.log("Billedet blev annulleret eller ingen assets fundet.");
      }
    } catch (error) {
      console.error("Fejl ved optagelse af billede:", error);
      Alert.alert("Der opstod en fejl.");
    }
  }

  let imagePreview = <Text>Intet billede taget endnu.</Text>;

  if (image) {
    imagePreview = <Image style={styles.image} source={{ uri: image }} />;
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
