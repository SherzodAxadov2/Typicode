<template>
  <CDropdown head-class="cursor-pointer">
    <template #head="{ show }">
      <div class="flex-y-center gap-3">
        <div>
          <p
            v-if="user.full_name"
            class="font-semibold text-base text-dark mb-0.5"
          >
            {{ user?.full_name }}
          </p>
          <p class="text-sm text-gray-200 text-right">
            {{ user?.role }}
          </p>
        </div>

        <CAvatar
          :image="user?.avatar_url"
          avatar-class="border-2 border-gray/[60]"
          size="sm"
        />

        <span
          :class="{ 'rotate-180': show }"
          class="icon-chevron font-medium transition-200 text-2xl text-gray-100"
        ></span>
      </div>
    </template>
    <ul class="p-1 shadow-dropdown">
      <li
        v-for="(item, idx) in dropdownItems"
        :key="idx"
        :class="item.styles"
        class="transition-200 flex flex-col gap-1 text-sm w-full text-dark hover:bg-gray/[10%] rounded"
        @click="item.action"
      >
        <div
          :class="{ '!border-b-0': idx === dropdownItems.length - 1 }"
          class="flex-y-center px-3 py-2 border-b border-[#F5F6F7] gap-2"
        >
          <i :class="item?.icon" class="!text-xs" />
          {{ item.label }}
        </div>
      </li>
    </ul>
  </CDropdown>
</template>

<script lang="ts" setup>
import CDropdown from "@/components/Common/CDropdown.vue";
import { computed, defineComponent } from "vue";
import CAvatar from "@/components/CAvatar.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/modules/Auth/stores";

defineComponent({
  name: "HeaderProfile",
});

interface Props {
  user?: {
    fullName: string;
    avatar: string;
    subtitle: string;
  };
  profileItems?: {
    title: string;
    class?: string;
    icon?: string;
    event?: string;
  }[];
}

defineProps<Props>();

const router = useRouter();
const { t } = useI18n();
const store = useAuthStore();

const user = computed(() => store.user);

interface IDropdownItem {
  label: string;
  styles?: string;
  action: () => void;
  icon: string;
}

const dropdownItems: IDropdownItem[] = [
  {
    label: t("log_out"),
    styles: "text-red-500 hover:!bg-red-50",
    action: () => logout(),
    icon: "icon-chevron-left",
  },
];

function logout() {
  store.logout();
  router.push({ name: "PAuth" });
}
</script>
