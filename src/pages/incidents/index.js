import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../api';
import logoImg from '../../assets/logo.png';
import style from './style';

export default function Incidents() {
    const [incidents, setIndidents] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();

    function navegateToDetail(row) {
        navigation.navigate('Detail', {row});
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }
        if (total > 0 && incidents.length === total) {
            return;
        }
        setLoading(true);
        const response = await api.get('incidents', {
            params: { page }
        });
        setIndidents([...incidents, ...response.data]);
        setPage(page + 1);
        setTotal(response.headers['x-total-count']);
        setLoading(false);
    }

    useEffect(() => {loadIncidents();}, []);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia:</Text>

            <FlatList
                data={incidents}
                keyExtractor={row => String(row.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.4}
                style={style.incidentList}
                renderItem={({ item: row }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{ row.ong.name }</Text>

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

                        <TouchableOpacity
                            style={style.detailsButton}
                            onPress={() => {navegateToDetail(row)}}
                        >
                            <Text style={style.detailButtonText}>Ver mais detalhes</Text>
                            <Feather
                                name="arrow-right"
                                size={16}
                                color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
