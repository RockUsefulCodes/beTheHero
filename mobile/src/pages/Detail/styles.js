import React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  content: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginTop: 48
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  contact: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
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

  contactActions: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between'
  },

  button: {
    backgroundColor: '#E82041',
    borderRadius: 8,
    padding: 15,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  textButton: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },

  incidentValue: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: '#737380'
  },
})