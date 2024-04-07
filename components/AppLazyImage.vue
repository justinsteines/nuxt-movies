<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const { src, srcSet } = defineProps<{
  src: string
  srcSet: string
  containerClass?: string
}>()

const loaded = ref(false)

const imageRef = ref<HTMLImageElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      imageRef.value!.src = src
      imageRef.value!.srcset = srcSet
      observer!.unobserve(imageRef.value!)
    }
  })

  if (imageRef.value) {
    observer.observe(imageRef.value)
  }
})

onUnmounted(() => {
  if (imageRef.value && observer) {
    observer.unobserve(imageRef.value)
  }
})
</script>

<template>
  <div class="bg-slate-900" :class="containerClass">
    <img
      ref="imageRef"
      v-bind="$attrs"
      class="transition-all duration-1000"
      :class="{
        'scale-100 opacity-100': loaded,
        'scale-95 opacity-0': !loaded,
      }"
      @load="() => (loaded = true)"
    />
  </div>
</template>
