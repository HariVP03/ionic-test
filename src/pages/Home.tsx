import { dismiss } from "@ionic/core/dist/types/utils/overlays";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonActionSheet,
  useIonAlert,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { body } from "ionicons/icons";
import { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const ModalBody: React.FC<{ dismiss: () => void }> = ({ dismiss }) => {
  return (
    <>
      <h2 style={{ width: "full", textAlign: "center" }}>Haha</h2>
      <IonButton onClick={dismiss}>Haha</IonButton>
    </>
  );
};

const Tab1: React.FC = () => {
  const [showActionSheet] = useIonActionSheet();
  const [showAlert] = useIonAlert();
  const dismissModal = () => {
    dismiss();
  };
  const [showModal, dismiss] = useIonModal(ModalBody, {
    dismiss: dismissModal,
  });
  const [showToast] = useIonToast();
  const [heading, setHeading] = useState("heading");
  const [count, setCount] = useState(0);
  const inc = () => {
    setCount((prev) => prev + 1);
  };
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="body">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <h1
          style={{
            width: "full",
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          {heading}
        </h1>
        <h3
          style={{
            width: "full",
            textAlign: "center",
          }}
        >
          {count}
        </h3>
        <div className="container">
          <IonButton
            onClick={() => {
              showActionSheet({
                header: "Kya dekh rha hai saale title hu",
                buttons: [
                  {
                    text: "Spam Button",
                    handler: () => {
                      inc();
                      return false;
                    },
                  },
                  {
                    text: "Closes on click",
                    handler: () => {
                      inc();
                      return true;
                    },
                  },
                ],
              });
            }}
          >
            Action Sheet
          </IonButton>
          <IonButton
            onClick={() => {
              showAlert({
                header: "Kya aapke bhi papa aapko marte hai",
                message: "Sad unga bunga",
                buttons: [
                  {
                    text: "Nahi bhai",
                    handler: () => {
                      setHeading("Jhutha");
                    },
                  },
                  {
                    text: "Ha bhai ;(",
                    handler: () => {
                      setHeading("same ;(");
                    },
                  },
                ],
              });
              // inc();
            }}
          >
            Alert
          </IonButton>
          <IonButton
            onClick={() => {
              showModal({
                canDismiss: true,
              });
            }}
          >
            Modal
          </IonButton>
          <IonButton
            onClick={() => {
              showToast({
                message: "Waow!",
                buttons: [{ text: "Yes" }, { text: "No" }],
              });
            }}
          >
            Toast
          </IonButton>
        </div>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
