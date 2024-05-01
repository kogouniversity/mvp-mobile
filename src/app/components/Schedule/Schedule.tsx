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

function Schedule({ courses }: { courses: Course[] }): JSX.Element {
    const timeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * totalMinutesInHour + minutes;
    };

    const renderSessions = (day: string): JSX.Element[] =>
        courses.flatMap(course =>
            course.sessions
                .filter(session => session.day === day)
                .map(session => (
                    <View
                        key={`${day}-${course.courseName}-${session}`}
                        style={[
                            styles.session,
                            {
                                zIndex: 100,
                                top: topOffset(session.startTime, hoursOfDay[0]),
                                height: sessionDuration(session.startTime, session.endTime),
                                backgroundColor: 'lightblue',
                            },
                        ]}>
                        <Text>{`${course.courseName}\n${session.type}\n${session.startTime}-${session.endTime}`}</Text>
                    </View>
                )),
        );

    const topOffset = (startTime: string, baseHour: string): number => {
        const startTimeMinutes = timeToMinutes(startTime);
        const baseHourMinutes = timeToMinutes(`${baseHour}:00`);
        return ((startTimeMinutes - baseHourMinutes) / totalMinutesInHour) * timeSlotHeight;
    };

    const sessionDuration = (startTime: string, endTime: string): number => {
        return ((timeToMinutes(endTime) - timeToMinutes(startTime)) / totalMinutesInHour) * timeSlotHeight;
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
                        <Text>{`${hour}:00`}</Text>
                    </View>
                    {daysOfWeek.map(day => (
                        <View key={`${day}-${hour}`} style={styles.dayColumn} />
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
}

export default Schedule;

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
