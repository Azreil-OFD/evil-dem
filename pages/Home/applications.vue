<template>
  <div class="application">
    <summary>Список заявок</summary>
    <details class="application-actual" open>
      <summary>Актуальные</summary>
      <div v-for=" item in applications">
        <p><b>Имя:</b> {{ user.fullName }} <br><b>Дата добавления:</b> {{String(item.createdAt).split('T')[0]}}<br><b>Оборудование:</b> {{item.equipment}}<br><b>Тип
            неисправности:</b> {{ item.issueType}}<br><b>Описание проблемы:</b> {{ item.description }}<br><b>Клиент:</b> Максим Олегов Николаевич<br><b>Статус:</b> {{item.status}}</p>
      </div>
      <p v-if="!applications.length">Пусто</p>

    </details>
    <details class="application-completed">
      <summary>Завершенные</summary>
      <p>Пусто</p>
      </details>  
  </div>
</template>

<script lang="ts" setup>
const authToken = useCookie('refreshToken');
const applications = ref([])
const user = ref([])
onMounted(async () => {
  const data = await useFetch('/api/applications', {
    method: 'POST'
  })
  applications.value = data.data.value.data
  user.value = data.data.value.user
console.log(data.data.value)
})


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

.application-title>summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.application-title>summary::after {
  transform: rotate(180deg);
  color: #999999;
  transition: transform 0.5s;
}

application-actual

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