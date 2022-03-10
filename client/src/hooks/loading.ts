import { ref } from 'vue'

export default function useLoading(state = false) {
  const loading = ref(state)
  const setLoading = (value: boolean) => {
    loading.value = value
  }
  const toggle = () => {
    loading.value = !loading.value
  }
  return {
    loading,
    setLoading,
    toggle
  }
}
