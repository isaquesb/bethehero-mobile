import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        marginTop: 48
    },
    incidentProperty: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#41414D',
        marginTop: 24
    },
    incidentValue: {
        fontSize: 15,
        color: '#737380',
        marginTop: 8
    },
    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30
    },
    heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    action: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
