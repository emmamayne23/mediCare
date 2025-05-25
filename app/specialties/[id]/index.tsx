import { API_URL } from "@/constants/constant";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SingleSpecialtyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [doctors, setDoctors] = useState<SpecialtyDoctors[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/specialties/${id}/doctors`);
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctors();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#058ef7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctors</Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/doctors/${item.id}`)}
            // onPress={() => router.push({ pathname: "/doctors", params: { id: item.id } })}
          >
            <Image source={{ uri: item.img }} style={styles.avatar} resizeMode="cover" />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.name}>{item.specialty}</Text>
              <Text style={styles.sub}>{item.qualifications}</Text>
              <Text style={styles.sub}>{item.yearsExperience} years experience</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    marginBottom: 12,
  },
  image: {
    width: 32,
    height: 32,
  },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600" },
  sub: { fontSize: 14, color: "#475569", marginTop: 2 },
});
