import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileContent() {
  const [status, setStatus] = useState("Nostaljik mod aktif! 📻");
  const [isModalVisible, setModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [activeTab, setActiveTab] = useState(0); 
  
  const [tasks, setTasks] = useState([
      { id: 1, name: 'Sabah kahvesi ve planlama', start: '08:00', end: '08:30', completed: true },
      { id: 2, name: 'Derin çalışma (Deep Work)', start: '09:00', end: '11:00', completed: false },
      { id: 3, name: 'React Native projesi', start: '13:00', end: '15:00', completed: false },
  ]);
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskName, setTaskName] = useState("");

  const handleUpdateStatus = () => {
    setStatus(newStatus);
    setModalVisible(false);
  };

  const addTask = () => {
    if(!taskName) return;
    setTasks([...tasks, { id: Date.now(), name: taskName, start: 'Şimdi', end: '-', completed: false }]);
    setShowTaskModal(false);
    setTaskName("");
  };

  return (
    <ScrollView className="flex-1 bg-page">
      {/* Üst Profil Kartı */}
      <View className="items-center mt-12 pb-8">
        {/* Profil Fotosu Çerçevesi - Retro Sarı/Turuncu */}
        <View className="w-32 h-32 rounded-full bg-surface items-center justify-center mb-5 shadow-sm border-4 border-yellow/30">
           <MaterialIcons name="person" size={70} color="#D97B56" />
        </View>
        
        <Text className="text-3xl font-bold text-dark tracking-tight">Sema</Text>
        
        <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-surface/80 px-6 py-3 rounded-full mt-3 border border-light/50 shadow-sm">
          <Text className="text-sm text-medium italic font-medium">“{status}”</Text>
        </TouchableOpacity>

        {/* İstatistikler */}
        <View className="flex-row mt-10 w-full justify-center gap-12">
            <View className="items-center">
                <Text className="text-3xl font-bold text-dark">120</Text>
                <Text className="text-xs text-medium uppercase font-bold tracking-widest mt-1">Takip</Text>
            </View>
            <View className="w-[2px] h-12 bg-light/50 rounded-full"></View>
            <View className="items-center">
                <Text className="text-3xl font-bold text-dark">85%</Text>
                <Text className="text-xs text-medium uppercase font-bold tracking-widest mt-1">Odak</Text>
            </View>
        </View>
      </View>

      {/* Modern Retro Tablar */}
      <View className="flex-row mx-6 bg-surface p-2 rounded-full border border-light/60 mb-8 shadow-sm">
        <TouchableOpacity 
          onPress={() => setActiveTab(0)}
          className={`flex-1 items-center py-3 rounded-full transition-all ${activeTab === 0 ? 'bg-accent shadow-md' : 'bg-transparent'}`}
        >
          <Text className={`font-bold text-base ${activeTab === 0 ? 'text-surface' : 'text-medium'}`}>Yapılacaklar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab(1)}
          className={`flex-1 items-center py-3 rounded-full transition-all ${activeTab === 1 ? 'bg-accent shadow-md' : 'bg-transparent'}`}
        >
          <Text className={`font-bold text-base ${activeTab === 1 ? 'text-surface' : 'text-medium'}`}>Sıralama</Text>
        </TouchableOpacity>
      </View>

      {/* İçerik Alanı */}
      <View className="px-6 pb-24">
        {activeTab === 0 ? (
          <View>
            {tasks.map((task, index) => (
              <View key={task.id} className={`p-5 rounded-3xl mb-3 border flex-row items-center transition-all ${task.completed ? 'bg-page border-light/30' : 'bg-surface border-light shadow-sm'}`}>
                 <TouchableOpacity onPress={() => {
                   const newTasks = [...tasks];
                   newTasks[index].completed = !newTasks[index].completed;
                   setTasks(newTasks);
                 }}>
                   <MaterialIcons 
                     name={task.completed ? "check-circle" : "radio-button-unchecked"} 
                     size={30} 
                     // Tamamlanınca Zeytin Yeşili, değilse Yanık Turuncu
                     color={task.completed ? "#83A686" : "#D97B56"} 
                   />
                 </TouchableOpacity>
                 <View className="ml-5 flex-1">
                    <Text className={`text-lg font-bold ${task.completed ? 'line-through text-light' : 'text-dark'}`}>{task.name}</Text>
                    {!task.completed && <Text className="text-mustard text-xs mt-2 font-bold tracking-wider">{task.start} - {task.end}</Text>}
                 </View>
              </View>
            ))}
            
            {/* Yeni Görev Ekle - Retro Dashed Border */}
            <TouchableOpacity 
              onPress={() => setShowTaskModal(true)}
              className="mt-4 border-2 border-dashed border-medium/50 rounded-3xl p-5 flex-row justify-center items-center bg-page/50"
            >
              <MaterialIcons name="add-circle-outline" size={28} color="#8B7E74" />
              <Text className="text-medium font-bold ml-3 text-lg">Yeni Görev Ekle</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Puan Tablosu Kartı - Sıcak Hardal tonları
          <View className="bg-yellow/10 p-8 rounded-4xl items-center border-2 border-yellow/30 shadow-sm">
            <Text className="text-lg font-bold text-dark/70 mb-6 uppercase tracking-widest">Haftalık Skor</Text>
            <View className="w-36 h-36 rounded-full bg-surface border-4 border-yellow items-center justify-center mb-6 shadow-md">
                <MaterialIcons name="star" size={48} color="#F2CC8F" />
                <Text className="text-5xl font-black text-dark mt-1">80</Text>
            </View>
            <Text className="text-dark font-medium text-center leading-7 text-lg px-4">
                Harika gidiyorsun! Geçen haftaya göre <Text className="text-accent font-black">%15</Text> daha fazla odaklandın.
            </Text>
          </View>
        )}
      </View>

      {/* Modallar (Aynı mantık, renkler güncellendi) */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-dark/30 backdrop-blur-sm">
          <View className="bg-surface p-8 rounded-4xl w-4/5 shadow-2xl border border-light">
            <Text className="text-2xl font-bold mb-6 text-dark text-center">Durum Güncelle</Text>
            <TextInput 
              className="bg-page border-2 border-light rounded-2xl p-5 mb-8 text-dark text-lg font-medium" 
              placeholder="Şu an modun nasıl?" 
              placeholderTextColor="#8B7E74"
              onChangeText={setNewStatus}
            />
            <View className="flex-row justify-between gap-6">
              <TouchableOpacity onPress={() => setModalVisible(false)} className="flex-1 bg-page py-4 rounded-2xl border border-light items-center">
                <Text className="text-medium font-bold text-lg">İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateStatus} className="flex-1 bg-accent py-4 rounded-2xl items-center shadow-md">
                <Text className="text-surface font-bold text-lg">Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <Modal visible={showTaskModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-dark/30">
            <View className="bg-surface p-8 rounded-t-4xl shadow-2xl h-3/5 border-t border-light">
                <View className="w-16 h-2 bg-light/70 rounded-full self-center mb-10" />
                <Text className="text-3xl font-bold mb-8 text-dark">Yeni Görev</Text>
                <TextInput 
                    className="bg-page border-2 border-light rounded-3xl p-6 mb-8 text-xl text-dark font-medium" 
                    placeholder="Ne yapacaksın?" 
                    placeholderTextColor="#8B7E74"
                    value={taskName}
                    onChangeText={setTaskName}
                    autoFocus
                />
                <TouchableOpacity onPress={addTask} className="bg-accent p-5 rounded-3xl items-center shadow-lg mb-4">
                    <Text className="text-white font-bold text-xl">Listeye Ekle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTaskModal(false)} className="items-center py-4">
                    <Text className="text-medium font-bold text-lg">Vazgeç</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </ScrollView>
  );
}