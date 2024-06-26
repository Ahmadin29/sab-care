import { Stack } from "expo-router";

export default function TechnicianLayout() {
    return(
        <>
            <Stack>
                <Stack.Screen name="index" options={{title:'Teknisi'}}/>
                <Stack.Screen name="add" options={{title:'Tambahkan Teknisi'}}/>
                <Stack.Screen name="[id]/edit" options={{title:'Ubah Teknisi'}}/>
            </Stack>
        </>
    )
}