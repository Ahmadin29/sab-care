import Input from "@/components/Input";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import useSession from "@/hooks/useSession";
import { TickSquare } from "iconsax-react-native";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Layouts from "@/constants/Layouts";
import useLocation from "@/hooks/useLocation";
import Button from "@/components/Button";

const INITIAL_REGION = {
  latitude: -6.2345251,
  longitude: 106.8146206,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

export default function InstallationPageRequest() {
  const { account } = useSession();
  const { currentPosition, isLocationGranted } = useLocation();

  const [useCurrentAddress, setUseCurrentAddress] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<any>();
  const [address, setAddress] = useState<string>("");
  const [region, setRegion] = useState<any>();

  const onAddressToggle = useCallback(() => {
    setUseCurrentAddress(!useCurrentAddress);
  }, [useCurrentAddress, account]);

  const onMapPress = useCallback((e: MapPressEvent) => {
    setCoordinate(e.nativeEvent.coordinate);
  }, []);

  const onCoordinateChange = useCallback((lat: number, lon: number) => {
    setCoordinate({
      latitude: lat,
      longitude: lon,
    });
  }, []);

  useEffect(() => {
    if (
      currentPosition?.coords?.latitude &&
      currentPosition?.coords?.longitude
    ) {
      setRegion({
        latitude: currentPosition?.coords.latitude,
        longitude: currentPosition?.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      onCoordinateChange(
        currentPosition?.coords.latitude,
        currentPosition?.coords.longitude
      );
    }
  }, [currentPosition?.coords]);

  return (
    <View style={styles.container}>
      <View>
        <Input
          label="Alamat"
          multiline
          value={address}
          onChangeText={(value) => {
            setAddress(value);
          }}
        />
        <TouchableOpacity
          style={styles.useCurrentMark}
          onPress={onAddressToggle}
        >
          <TickSquare
            color={useCurrentAddress ? Colors.primary : Colors.textSecondary}
            variant={useCurrentAddress ? "Bulk" : "Linear"}
          />
          <Text style={styles.useCurrentMarkText}>
            Gunakan alamat saat pendaftaran
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <Text size={10} weight="Medium">
          Tentukan Lokasi Di Map
        </Text>
        <MapView
          style={styles.map}
          onPress={onMapPress}
          provider="google"
          region={region}
          initialRegion={INITIAL_REGION}
          onRegionChange={(data) => {
            onCoordinateChange(data.latitude, data.longitude);
          }}
        >
          {coordinate && <Marker coordinate={coordinate}></Marker>}
        </MapView>
      </View>

      <Button style={styles.button} label={"Ajikan Pemasangan"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
  },
  useCurrentMark: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  useCurrentMarkText: {
    marginLeft: 5,
    marginTop: -2,
  },
  mapContainer: {
    marginTop: 20,
  },
  map: {
    width: Layouts.width - 30,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  marker: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  button:{
    marginTop:30,
  }
});
