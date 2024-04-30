import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SelectField from '../../atoms/SelectField';
import Schedule from '../../components/Schedule/Schedule';
import { useGetSchedule } from '../../hooks/api/schedule/useGetSchedule';

interface SemesterOptionType {
    label: string;
    value: string;
}

const semesters: SemesterOptionType[] = [
    { label: 'Spring 24', value: 'spring_2024' },
    { label: 'Summer 24', value: 'summer_2024' },
];

const ScheduleScreen = () => {
    const [selectedSemester, setSelectedSemester] = useState<SemesterOptionType>(semesters[0]);
    const { data: courses, isLoading } = useGetSchedule(selectedSemester.value);

    const handleSemesterSelect = (option: SemesterOptionType) => {
        setSelectedSemester(option);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.selectFieldContainer}>
                    <SelectField label="Choose semester" data={semesters} onSelect={handleSemesterSelect} width={90} />
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                    <MaterialIcons name="notifications-none" size={24} color="black" />
                </View>
            </View>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Schedule courses={courses || []} />}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    selectFieldContainer: {
        flex: 1,
        marginRight: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ScheduleScreen;
