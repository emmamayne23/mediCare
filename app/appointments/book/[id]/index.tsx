import { API_URL } from "@/constants/constant";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BookAppointmentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [slots, setSlots] = useState<Slots[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/time-slots/${id}`);
        const data = response.data;
        // console.log(data)
        setSlots(data);
      } catch (error) {
        console.error("Could not fetch slots", error);
      }
    };
    fetchSlots();
  }, [id]);
  return (
    <View>
      <Text>BookAppointmentScreen</Text>

      <View style={styles.container}>
        <FlatList
          data={slots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.slot}
              onPress={() => router.push(`/appointments/confirm/${item.id}`)}
            >
              <Text>{item.startTime}</Text>
              <Text>{item.endTime}</Text>
              <Text>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    display: "flex",
    gap: 5,
    flexDirection: "row",
    padding: 5,
  },
  slot: {
    borderWidth: 1,
    width: 100,
  },
});
