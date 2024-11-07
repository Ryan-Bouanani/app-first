import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Modal, ImageBackground, TouchableNativeFeedback, Platform, KeyboardAvoidingView } from 'react-native';

const GoalsApp = () => {
  const [sampleGoals, setSampleGoals] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d'altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon",
  ]);

  const [newGoal, setNewGoal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setSampleGoals([...sampleGoals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...sampleGoals];
    updatedGoals.splice(index, 1);
    setSampleGoals(updatedGoals);
  };

  const editGoal = (index) => {
    setGoalToEdit(sampleGoals[index]);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const updateGoal = () => {
    if (goalToEdit.trim() !== '' && editingIndex !== null) {
      const updatedGoals = [...sampleGoals];
      updatedGoals[editingIndex] = goalToEdit.trim();
      setSampleGoals(updatedGoals);
      setGoalToEdit(null);
      setEditingIndex(null);
      setModalVisible(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://th.bing.com/th/id/OIP.vr5mGzceCA4tvMgivVRzzgHaEK?rs=1&pid=ImgDetMain' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.red]}>App.js</Text>
          <Text style={[styles.headerText, styles.bold]}>Liste objectifs de vie</Text>
        </View>
        <FlatList
          data={sampleGoals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => editGoal(index)}>
                  <Text style={styles.deleteIcon}>✎</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteGoal(index)}>
                  <Text style={styles.deleteIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nouvel objectif"
            value={newGoal}
            onChangeText={setNewGoal}
          />
          {Platform.OS === 'android' ? (
            <TouchableNativeFeedback
              onPress={addGoal}
              background={TouchableNativeFeedback.SelectableBackground()}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={addGoal}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier l'objectif</Text>
              <TextInput
                style={styles.modalInput}
                value={goalToEdit}
                onChangeText={setGoalToEdit}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={updateGoal}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.modalButtonText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 245, 245, 0.8)', // Semi-transparent background to overlay on the image
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  red: {
    color: '#FF5252',
  },
  bold: {
    fontWeight: 'bold',
  },
  goalItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  goalText: {
    fontSize: 16,
    flexShrink: 1, // Allow text to wrap
    marginRight: 10, // Add some space between text and icons
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 24,
    color: '#FF5252',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  button: {
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    marginRight: 12,
  },
  saveButton: {
    backgroundColor: '#FF5252',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalsApp;
