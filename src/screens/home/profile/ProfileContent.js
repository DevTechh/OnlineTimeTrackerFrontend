import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export default function ProfileContent() {
  const { isDark } = useTheme(); // Tema verisi
  
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

  // --- RENK PALETİ (Nostaljik Dark/Light) ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',        // Espresso / Antik Krem
    surface: isDark ? '#342A25' : '#FEF9E7',   // Koyu Deri / Açık Krem
    textMain: isDark ? '#EADDcF' : '#3E322B',  // Eski Kağıt / Koyu Kahve
    textSec: isDark ? '#9C8F85' : '#8B7E74',   // Kül / Vizon
    border: isDark ? '#4E4039' : '#D4C5B9',    // Koyu Çizgi / Açık Çizgi
    accent: '#D97B56',                         // Yanık Turuncu (Ortak)
    mustard: '#EBBAB9',                        // Gül Kurusu (Ortak)
    yellow: '#F2CC8F',                         // Hardal (Ortak)
    inputBg: isDark ? '#1F1B18' : '#F0EAD6',   // Input Zemini
  };

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
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      
      {/* --- Üst Profil Kartı --- */}
      <View className="items-center mt-12 pb-8">
        {/* Profil Fotosu Çerçevesi */}
        <View style={{ backgroundColor: colors.surface, borderColor: isDark ? '#F2CC8F30' : '#F2CC8F50' }} className="w-32 h-32 rounded-full items-center justify-center mb-5 shadow-sm border-4">
           <MaterialIcons name="person" size={70} color={colors.accent} />
        </View>
        
        <Text style={{ color: colors.textMain }} className="text-3xl font-bold tracking-tight">Sema</Text>
        
        <TouchableOpacity 
            onPress={() => setModalVisible(true)} 
            style={{ backgroundColor: isDark ? '#342A25' : '#FEF9E790', borderColor: colors.border }}
            className="px-6 py-3 rounded-full mt-3 border shadow-sm"
        >
          <Text style={{ color: colors.textSec }} className="text-sm italic font-medium">“{status}”</Text>
        </TouchableOpacity>

        {/* İstatistikler */}
        <View className="flex-row mt-10 w-full justify-center gap-12">
            <View className="items-center">
                <Text style={{ color: colors.textMain }} className="text-3xl font-bold">120</Text>
                <Text style={{ color: colors.textSec }} className="text-xs uppercase font-bold tracking-widest mt-1">Takip</Text>
            </View>
            <View style={{ backgroundColor: colors.border }} className="w-[2px] h-12 rounded-full"></View>
            <View className="items-center">
                <Text style={{ color: colors.textMain }} className="text-3xl font-bold">85%</Text>
                <Text style={{ color: colors.textSec }} className="text-xs uppercase font-bold tracking-widest mt-1">Odak</Text>
            </View>
        </View>
      </View>

      {/* --- Modern Retro Tablar --- */}
      <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="flex-row mx-6 p-2 rounded-full border mb-8 shadow-sm">
        <TouchableOpacity 
          onPress={() => setActiveTab(0)}
          style={activeTab === 0 ? { backgroundColor: colors.accent } : {}}
          className={`flex-1 items-center py-3 rounded-full transition-all ${activeTab === 0 ? 'shadow-md' : ''}`}
        >
          <Text className={`font-bold text-base ${activeTab === 0 ? 'text-[#FEF9E7]' : ''}`} style={activeTab !== 0 ? { color: colors.textSec } : {}}>Yapılacaklar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab(1)}
          style={activeTab === 1 ? { backgroundColor: colors.accent } : {}}
          className={`flex-1 items-center py-3 rounded-full transition-all ${activeTab === 1 ? 'shadow-md' : ''}`}
        >
          <Text className={`font-bold text-base ${activeTab === 1 ? 'text-[#FEF9E7]' : ''}`} style={activeTab !== 1 ? { color: colors.textSec } : {}}>Sıralama</Text>
        </TouchableOpacity>
      </View>

      {/* --- İçerik Alanı --- */}
      <View className="px-6 pb-24">
        {activeTab === 0 ? (
          <View>
            {tasks.map((task, index) => (
              <View 
                key={task.id} 
                style={{ 
                    backgroundColor: task.completed ? colors.bg : colors.surface,
                    borderColor: task.completed ? colors.border : colors.border,
                    borderWidth: 1
                }}
                className="p-5 rounded-3xl mb-3 flex-row items-center shadow-sm"
              >
                 <TouchableOpacity onPress={() => {
                   const newTasks = [...tasks];
                   newTasks[index].completed = !newTasks[index].completed;
                   setTasks(newTasks);
                 }}>
                   <MaterialIcons 
                     name={task.completed ? "check-circle" : "radio-button-unchecked"} 
                     size={30} 
                     color={task.completed ? colors.green : colors.accent} 
                   />
                 </TouchableOpacity>
                 <View className="ml-5 flex-1">
                    <Text 
                        style={{ 
                            color: task.completed ? colors.border : colors.textMain,
                            textDecorationLine: task.completed ? 'line-through' : 'none'
                        }}
                        className="text-lg font-bold"
                    >
                        {task.name}
                    </Text>
                    {!task.completed && <Text style={{ color: colors.mustard }} className="text-xs mt-2 font-bold tracking-wider">{task.start} - {task.end}</Text>}
                 </View>
              </View>
            ))}
            
            {/* Yeni Görev Ekle Butonu */}
            <TouchableOpacity 
              onPress={() => setShowTaskModal(true)}
              style={{ backgroundColor: isDark ? '#1F1B18' : '#F0EAD680', borderColor: colors.textSec }}
              className="mt-4 border-2 border-dashed rounded-3xl p-5 flex-row justify-center items-center"
            >
              <MaterialIcons name="add-circle-outline" size={28} color={colors.textSec} />
              <Text style={{ color: colors.textSec }} className="font-bold ml-3 text-lg">Yeni Görev Ekle</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Puan Tablosu
          <View style={{ backgroundColor: isDark ? '#F2CC8F10' : '#F2CC8F20', borderColor: isDark ? '#F2CC8F30' : '#F2CC8F50' }} className="p-8 rounded-4xl items-center border-2 shadow-sm">
            <Text style={{ color: isDark ? '#EADDcF80' : '#3E322B90' }} className="text-lg font-bold mb-6 uppercase tracking-widest">Haftalık Skor</Text>
            <View style={{ backgroundColor: colors.surface, borderColor: colors.yellow }} className="w-36 h-36 rounded-full border-4 items-center justify-center mb-6 shadow-md">
                <MaterialIcons name="star" size={48} color={colors.yellow} />
                <Text style={{ color: colors.textMain }} className="text-5xl font-black mt-1">80</Text>
            </View>
            <Text style={{ color: colors.textMain }} className="font-medium text-center leading-7 text-lg px-4">
                Geçen haftaya göre <Text style={{ color: colors.accent }} className="font-black">%15</Text> daha fazla odaklandın.
            </Text>
          </View>
        )}
      </View>

      {/* --- Durum Modalı --- */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 backdrop-blur-sm">
          <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-8 rounded-4xl w-4/5 shadow-2xl border">
            <Text style={{ color: colors.textMain }} className="text-2xl font-bold mb-6 text-center">Durum Güncelle</Text>
            <TextInput 
              style={{ backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }}
              className="border-2 rounded-2xl p-5 mb-8 text-lg font-medium" 
              placeholder="Şu an modun nasıl?" 
              placeholderTextColor={colors.textSec}
              onChangeText={setNewStatus}
            />
            <View className="flex-row justify-between gap-6">
              <TouchableOpacity 
                onPress={() => setModalVisible(false)} 
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                className="flex-1 py-4 rounded-2xl border items-center"
              >
                <Text style={{ color: colors.textSec }} className="font-bold text-lg">İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateStatus} style={{ backgroundColor: colors.accent }} className="flex-1 py-4 rounded-2xl items-center shadow-md">
                <Text className="text-[#FEF9E7] font-bold text-lg">Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* --- Görev Ekleme Modalı --- */}
      <Modal visible={showTaskModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-8 rounded-t-4xl shadow-2xl h-3/5 border-t">
                <View style={{ backgroundColor: colors.border }} className="w-16 h-2 rounded-full self-center mb-10" />
                <Text style={{ color: colors.textMain }} className="text-3xl font-bold mb-8">Yeni Görev</Text>
                <TextInput 
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }}
                    className="border-2 rounded-3xl p-6 mb-8 text-xl font-medium" 
                    placeholder="Ne yapacaksın?" 
                    placeholderTextColor={colors.textSec}
                    value={taskName}
                    onChangeText={setTaskName}
                    autoFocus
                />
                <TouchableOpacity onPress={addTask} style={{ backgroundColor: colors.accent }} className="p-5 rounded-3xl items-center shadow-lg mb-4">
                    <Text className="text-[#FEF9E7] font-bold text-xl">Listeye Ekle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTaskModal(false)} className="items-center py-4">
                    <Text style={{ color: colors.textSec }} className="font-bold text-lg">Vazgeç</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </ScrollView>
  );
}