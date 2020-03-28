import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import styles from './styles'
import logo from '../../assets/logo.png'

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()
  const incident = route.params.incident

  const message = `
  Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso 
  "${incident.title}" com o valor de "${
    Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL'
    }).format(incident.value)
  }"
  `
  function navigateBack() {
    navigation.goBack()
  }

  function openWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  function openEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}, {incident.city} - {incident.state}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={[styles.incidentValue, {marginBottom: 0}]}>
          {
            Intl.NumberFormat('pt-BR', {
              style: 'currency', currency: 'BRL'
            }).format(incident.value)
          }
        </Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
       
       <View style={styles.contactActions}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={openWhatsApp}>
            <Text style={styles.textButton}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={openEmail}>
            <Text style={styles.textButton}>E-mail</Text>
          </TouchableOpacity>
       </View>
      </View>
    </View>
  )
}