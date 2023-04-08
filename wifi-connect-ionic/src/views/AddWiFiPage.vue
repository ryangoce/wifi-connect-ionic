<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title>Add a New Wi-Fi Network</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <form @submit.prevent="connect">
        <ion-list>
          <ion-item>
            <ion-input label="SSID" labelPlacement="stacked" autocomplete="off" v-model="ssid" type="text" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Passphrase" labelPlacement="stacked" v-model="passphrase" type="password" required></ion-input>
          </ion-item>

        </ion-list>
        <button type="submit" v-show="false" ref="submitButton"></button>
      </form>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button @click="onButtonClicked" type="button" color="primary" expand="block">Add</ion-button>
      </ion-toolbar>
    </ion-footer>
    
  </ion-page>


</template>

<script setup lang="ts">

import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonInput,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonFooter,
useIonRouter
} from '@ionic/vue';

import { ref } from 'vue';
import { useWiFi } from '@/composables/use-wifi';

const ionRouter = useIonRouter();
const wifi = useWiFi()
const submitButton = ref()

const ssid = ref(''),
  passphrase = ref('')

const onButtonClicked = () => {
  submitButton.value.click()
}

const connect = async () => {
  await wifi.addWifiConfig({
    ssid: ssid.value,
    passphrase: passphrase.value
  })
  ionRouter.back()
}

</script>
