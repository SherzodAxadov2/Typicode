<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

import { IActionType } from "@/modules/Albums/types";
import CDropdown from "@/components/Common/Dropdown/CDropdown.vue";

interface Props {
  list: IActionType[];
  selectedItem?: unknown;
}
defineProps<Props>();

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <CDropdown class="w-7 ml-auto">
    <template #head>
      <div
        class="h-6 w-6 ml-auto nr-5 flex items-center justify-center gap-2.5 rounded-md bg-transparent group hover:bg-gray focus:bg-gray cursor-pointer transition-300"
      >
        <i
          class="icon-icon-3dot text-2xl text-gray-200 group-hover:text-dark duration-300"
        />
      </div>
    </template>

    <template #default>
      <div class="flex flex-col bg-white rounded-lg shadow-dropdown">
        <template v-for="(item, index) in list" :key="index">
          <div
            @click="
              item.value === 'edit'
                ? emit('edit', selectedItem)
                : emit('delete', selectedItem)
            "
            class="min-w-[158px] h-11 cursor-pointer flex items-center p-3 gap-2 hover:bg-gray/40 transition-300 group"
            :class="item.class"
          >
            <i :class="item.icon" class="text-gray text-xl transition-300" />
            <span class="text-sm font-medium text-dark-100 leading-normal">
              {{ $t(item.label) }}
            </span>
          </div>
        </template>
      </div>
    </template>
  </CDropdown>
</template>
