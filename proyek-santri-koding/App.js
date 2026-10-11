import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
} from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Belajar React Native dan Express',
      image: 'https://santrikoding.com/images/posts/react-native.png',
    },
    {
      id: '2',
      title: 'Tutorial Fullstack JavaScript Developer',
      image: 'https://santrikoding.com/images/posts/express.png',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = (id) => {
    setPosts((prevPosts) => prevPosts.filter((item) => item.id !== id));
  };

  const openEditModal = (item) => {
    setSelectedPost(item);
    setEditTitle(item.title);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((item) =>
        item.id === selectedPost.id ? { ...item, title: editTitle } : item
      )
    );

    setModalVisible(false);
    setSelectedPost(null);
    setEditTitle('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.btnEdit}
          onPress={() => openEditModal(item)}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tutorial Express + React Native</Text>
      </View>

      {/* Daftar Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Data post kosong.</Text>
          </View>
        }
      />

      {/* Floating Action Button (+) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          const newId = String(Date.now());
          setPosts([
            ...posts,
            {
              id: newId,
              title: `Post Baru #${posts.length + 1}`,
              image: 'https://santrikoding.com/images/posts/react-native.png',
            },
          ]);
        }}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* MODAL EDIT */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Data Post</Text>
            
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Masukkan judul baru"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnCancel]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.btnTextModal}>Batal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnSave]}
                onPress={handleSaveEdit}>
                <Text style={styles.btnTextModal}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 1,
  },
  cardImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#e9ecef',
  },
  cardTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#343a40',
    paddingRight: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  btnEdit: {
    backgroundColor: '#0d6efd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnDelete: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 25,
    backgroundColor: '#ff4d6d',
    borderRadius: 25,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
    lineHeight: 26,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#6c757d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212529',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnCancel: {
    backgroundColor: '#6c757d',
  },
  btnSave: {
    backgroundColor: '#198754',
  },
  btnTextModal: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});