import React, {useEffect, useState} from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import logo from '../../assets/logo.png'
import styles from './styles'
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation()

  const [incidents, setIncidents] = useState([])

  async function loadIncidents() {
    const resp = await api.get('incidents')
    setIncidents(resp.data)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  function navigateToDetail() {
    navigation.navigate('Detail')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>0 casos</Text></Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

      <FlatList 
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        data={incidents}
        renderItem={({item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{incident.value}</Text>

            <TouchableOpacity onPress={() => navigateToDetail()} style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>    
        )}/>
    </View>
  )
}