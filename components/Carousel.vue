<script setup lang="ts">
export interface ItemsPerPage {
  mobile: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

withDefaults(
  defineProps<{
    title: string
    items?: {
      id: number
      title?: string
      subtitle?: string | { [key: string]: number | string | undefined }
      link: string
      imagePath?: string | null
    }[]
    itemsPerPage?: ItemsPerPage
  }>(),
  { itemsPerPage: () => ({ mobile: 2, sm: 3, md: 3, lg: 4, xl: 5, '2xl': 6 }) }
)

const itemsRef = ref<{ $el: HTMLElement } | null>(null)
const showLeftButton = ref(false)
const showRightButton = ref(false)

onMounted(() => {
  // Show the right button if the items container is scrollable.
  if (itemsRef.value?.$el.clientWidth !== itemsRef.value?.$el.scrollWidth) {
    showRightButton.value = true
  }
})

function onClick(direction: 'left' | 'right') {
  // The element connected to itemsRef is using content-box sizing.
  // Use getComputedStyle to get the width without padding.
  const width = +getComputedStyle(itemsRef.value!.$el).width.replace('px', '')
  if (direction === 'left') {
    itemsRef.value!.$el.scrollLeft -= width
  } else if (direction === 'right') {
    itemsRef.value!.$el.scrollLeft += width
  }
}

const onScroll = _throttle((evt: Event) => {
  if ((evt.target as HTMLElement).scrollLeft <= 0) {
    showLeftButton.value = false
    showRightButton.value = true
  } else if (
    (evt.target as HTMLElement).scrollLeft +
      (evt.target as HTMLElement).clientWidth >=
    (evt.target as HTMLElement).scrollWidth - 1
  ) {
    showLeftButton.value = true
    showRightButton.value = false
  } else {
    showLeftButton.value = true
    showRightButton.value = true
  }
}, 500)
</script>

<template>
  <div class="my-14">
    <AppContainer>
      <h2 class="mb-4 text-2xl font-bold">{{ title }}</h2>
    </AppContainer>
    <div class="relative flex">
      <CarouselButton
        v-if="showLeftButton"
        class="left-0 rounded-r-lg border-l-0"
        @click="onClick('left')"
      >
        &lsaquo;
      </CarouselButton>
      <AppContainer
        ref="itemsRef"
        class="items box-content flex w-full snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-none scroll-smooth"
        @scroll="onScroll"
      >
        <CarouselItem
          v-for="item of items"
          :key="item.id"
          :link="item.link"
          :items-per-page="itemsPerPage"
        >
          <CarouselItemImage
            :image-path="item.imagePath"
            :alt="item.title || 'Poster image'"
          />
          <CarouselItemTitle
            v-if="item.title"
            :title="item.title"
            :subtitle="
              typeof item.subtitle === 'string' ? item.subtitle : undefined
            "
          >
            <template v-if="typeof item.subtitle === 'object'" #subtitle>
              <slot name="subtitle" v-bind="item.subtitle" />
            </template>
          </CarouselItemTitle>
        </CarouselItem>
      </AppContainer>
      <CarouselButton
        v-if="showRightButton"
        class="right-0 rounded-l-lg border-r-0"
        @click="onClick('right')"
      >
        &rsaquo;
      </CarouselButton>
    </div>
  </div>
</template>

<style scoped>
.items::-webkit-scrollbar {
  display: none;
}
.items {
  scrollbar-width: none;
}
</style>
