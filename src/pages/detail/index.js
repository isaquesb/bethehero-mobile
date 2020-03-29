import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import style from './style';

export default function Detail() {
    const route = useRoute();
    const row = route.params.row;
    const navigation = useNavigation();
    const message = `Ola ${row.ong.name}, estou entrando com contato, pois gostaria de ajudar no caso ${row.title}.`;

    function navegateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${row.title}`,
            recipients: [row.ong.email],
            body: message
        })
    }

    function sendWhats() {
        Linking.openURL(`whatsapp://send?phone=${row.ong.cellphone}&text=${message}`)
    }

    return (
        <View>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                    style={style.detailsButton}
                    onPress={() => {navegateBack()}}
                >
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[ style.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={style.incidentValue}>{ row.ong.name } de {row.ong.city} / {row.ong.uf}</Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{ row.title }</Text>

                <Text style={style.incidentProperty}>Valor:</Text>
                <Text
                    style={style.incidentValue}>
                        { Intl.NumberFormat(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(row.value) }</Text>
            </View>

            <View style={style.contactBox}>
                    <Text style={style.heroTitle}>Salve o dia!</Text>
                    <Text style={style.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={style.heroDescription}>Entre em contato:</Text>
                    <View style={style.actions}>
                        <TouchableOpacity style={style.action} onPress={sendWhats}>
                            <Text style={style.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.action} onPress={sendMail}>
                            <Text style={style.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}
