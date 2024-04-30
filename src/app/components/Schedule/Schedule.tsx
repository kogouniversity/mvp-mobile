import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const timeColumnWidth = 50;
const cellWidth = (screenWidth - timeColumnWidth) / 5;
const timeSlotHeight = 40;
const totalMinutesInHour = 60;

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hoursOfDay = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];

interface Session {
    day: string;
    startTime: string;
    endTime: string;
    type: string;
}

interface Course {
    courseName: string;
    sessions: Session[];
}

const Schedule = ({ courses }: { courses: Course[] }) => {
    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * totalMinutesInHour + minutes;
    };

    const calculateTopOffset = (startTime: string, baseHour: string) => {
        const startTimeMinutes = timeToMinutes(startTime);
        const baseHourMinutes = timeToMinutes(baseHour + ':00');
        return ((startTimeMinutes - baseHourMinutes) / totalMinutesInHour) * timeSlotHeight;
    };

    const calculateSessionDuration = (startTime: string, endTime: string) => {
        return ((timeToMinutes(endTime) - timeToMinutes(startTime)) / totalMinutesInHour) * timeSlotHeight;
    };

    const renderSessions = (day: string) => {
        return courses.flatMap((course, courseIndex) =>
            course.sessions
                .filter(session => session.day === day)
                .map((session, sessionIndex) => {
                    const topOffset = calculateTopOffset(session.startTime, hoursOfDay[0]);
                    const sessionDuration = calculateSessionDuration(session.startTime, session.endTime);
                    return (
                        <View
                            key={`${day}-${course.courseName}-${sessionIndex}`}
                            style={[
                                styles.session,
                                {
                                    zIndex: 100,
                                    top: topOffset,
                                    height: sessionDuration,
                                    backgroundColor: 'lightblue',
                                },
                            ]}>
                            <Text>
                                {course.courseName} {'\n'}
                                {session.type} {'\n'}
                                {session.startTime}-{session.endTime}
                            </Text>
                        </View>
                    );
                }),
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.headerCell, { width: timeColumnWidth }]} />
                {daysOfWeek.map(day => (
                    <View key={day} style={styles.headerCell}>
                        <Text style={styles.header}>{day}</Text>
                    </View>
                ))}
            </View>

            {hoursOfDay.map(hour => (
                <View key={hour} style={styles.row}>
                    <View style={[styles.timeCell, { width: timeColumnWidth }]}>
                        <Text>{hour}:00</Text>
                    </View>
                    {daysOfWeek.map(day => (
                        <View key={`${day}-${hour}`} style={styles.dayColumn}></View>
                    ))}
                </View>
            ))}
            {daysOfWeek.map((day, index) => (
                <View key={day} style={[styles.sessionsContainer, { left: timeColumnWidth + index * cellWidth }]}>
                    {renderSessions(day)}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cell: {
        width: cellWidth,
        height: timeSlotHeight,
        borderWidth: 0.3,
        borderColor: '#ccc',
        zIndex: 1,
    },
    timeCell: {
        height: timeSlotHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: '#ccc',
        zIndex: 1,
    },
    dayColumn: {
        width: cellWidth,
        height: timeSlotHeight,
        borderWidth: 0.3,
        borderColor: '#ccc',
    },
    sessionsContainer: {
        position: 'absolute',
        top: 30,
        width: cellWidth,
        height: timeSlotHeight * hoursOfDay.length,
    },
    headerCell: {
        width: cellWidth,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    header: {
        fontWeight: 'normal',
    },
    session: {
        position: 'absolute',
        width: cellWidth,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        zIndex: 500,
    },
});

export default Schedule;
