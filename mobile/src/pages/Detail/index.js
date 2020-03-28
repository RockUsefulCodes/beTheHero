import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import styles from './styles'
import logo from '../../assets/logo.png'

export default function Detail() {
  const navigation = useNavigation()
  const message = 'Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha Atropelada" com o valor de "150"'

  function navigateBack() {
    navigation.goBack()
  }

  function openWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=123&text=${message}`)
  }

  function openEmail() {
    MailComposer.composeAsync({
      subject: '',
      recipients: [],
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
        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>
        
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>APAD</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={[styles.incidentValue, {marginBottom: 0}]}>120</Text>
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