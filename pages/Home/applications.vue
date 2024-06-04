<template>
  <div class="application">
    <details class="application-title">
      <summary>Список заявок</summary>
      <details v-if="applications" class="application-actual">
        <summary>Актуальные</summary>
        <div v-for="application in applications">
          <p><b>Имя:</b> {{ user.fullName }}<br><b>Дата добавления:</b> {{ String(application.createdAt).split("T")[0] }}<br><b>Оборудование:</b> {{ application.equipment }}<br><b>Тип
            неисправности:</b> {{ application.issueType }}<br><b>Описание проблемы:</b> {{ application.description }}<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> {{ application.status }}</p>
        </div>
      </details>
      <!-- <details class="application-completed">
        <summary>Завершенные</summary>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
        <p><b>Имя:</b> ООО Россети<br><b>Дата добавления:</b> 02.02.2022<br><b>Оборудование:</b> компьютер<br><b>Тип
            неисправности:</b> механическая<br><b>Описание проблемы:</b> что-то поломало моё устройство вчера
          вечером.<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> выполнено</p>
      </details> -->
    </details>
  </div>
</template>

<script lang="ts" setup>
import { useApplicationsStore } from '~/store/applications.store';

const authToken = useCookie('refreshToken');
const applications = ref([])
const user = ref([])

const store = useApplicationsStore();

await store.fetchApplications();

applications.value = store.applications;
user.value = store.user;
console.log(applications.value);
</script>

<style lang="scss" scoped>
summary {
  user-select: none;
  padding: 2px;
  cursor: pointer;
  list-style: none;
}

details {
  p {
    word-wrap: normal;
    margin-left: 23px;
  }
}

b {
  font-weight: 500;
}

.application {
  width: 700px;
  margin-bottom: 100px;
  border: 2px solid #D9D9D9;
  border-radius: 17px;
  padding: 13px 30px;
}

.application-title > summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.application-title > summary::after {
  content: '▲'; /* Юникод символ стрелки вправо */
  transform: rotate(180deg);
  color: #999999;
  transition: transform 0.5s;
}

/* Поворот стрелки при раскрытии */
details[open] summary::after {
  transform: rotate(0deg);
}

.application-actual summary,
.application-completed summary {
  list-style-type: circle;
  margin: 10px 0 10px 20px;
}

.application-actual[open]>summary,
.application-completed[open]>summary {
  list-style-type: disc;
}

.application-actual {
  margin-top: 20px;
}
</style>