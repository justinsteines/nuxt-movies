<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const { src, srcset } = defineProps<{
  src: string
  srcset: string
  containerClass?: string
}>()

const loaded = ref(false)

const imageRef = ref<HTMLImageElement | null>(null)
let imageRefValue: HTMLImageElement | null = null
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      imageRefValue!.src = src
      imageRefValue!.srcset = srcset
      observer!.unobserve(imageRefValue!)
    }
  })

  if (imageRef.value) {
    observer.observe(imageRef.value)
    imageRefValue = imageRef.value
  }
})

onUnmounted(() => {
  if (imageRefValue && observer) {
    observer.unobserve(imageRefValue)
  }
})
</script>

<template>
  <div class="bg-slate-900" :class="containerClass">
    <img
      ref="imageRef"
      v-bind="$attrs"
      class="h-full transition-all duration-1000"
      :class="{
        'scale-100 opacity-100': loaded,
        'scale-95 opacity-0': !loaded,
      }"
      crossorigin="anonymous"
      @load="() => (loaded = true)"
    />
  </div>
</template>
