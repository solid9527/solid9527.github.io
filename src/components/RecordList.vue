<template lang="html">
  <div class="">
    <h1>記帳</h1>

    <ul class="record">
      <li v-for="(record,rid) in records" :style="{'animation-delay': rid/10+'s'}">
        <span class="cata">{{record.cata}}</span>
        <span class="date">{{record.date}}</span>
        <span class="price">{{record.price}}元</span>
        <button type="button" name="button" @click="listRemoveItem(record,rid)">移除</button>
      </li>

    </ul>
    <h3>總計:{{total}}</h3>
    <input type="text" name="" value="" v-model="newrecord.date" placeholder="日期">
    <input type="text" name="" value="" v-model.number="newrecord.price" placeholder="金額">
    <input type="text" name="" value="" v-model="newrecord.cata" placeholder="名稱">
    <button type="button" name="button" @click="additem(newrecord)">新增</button>
  </div>

</template>

<script>
  export default {
    // props: ["records"],
    data() {
      return {
        newrecord: {},
        records: [{
          date: "2018/2/2",
          price: 500,
          cata: "食物"
        },{
          date: "2018/2/2",
          price: 200,
          cata: "雞排"
        } ],
      }
    },
    methods: {
      listRemoveItem(obj,rid) {
        this.records = this.records.filter(item => item !== obj);
      },
      additem(obj) {
        if (!obj.price) {
          return false
        }
        if (!obj.date) {
          let today = new Date();
          this.newrecord.date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
        }

        this.records.push(obj);
      },
    },
    computed: {
      total() {
        return this.records.reduce((total, record) => total + record.price, 0);
      }
    }
  }

</script>

<style lang="scss" scoped>
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);

    }
  }

  .record {
    li {
      display: flex;
      padding: 5px;
      margin-bottom: 15px;
      border-radius: 5px;
      border: 1px solid #000;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.5s both;

      .cata {
        flex: 5;
        text-align: left;
      }

      .date {
        flex: 1;
        margin-right: 15px;
      }

      button {
        margin-left: 15px;
        margin-right: 10px;
      }
    }
  }

</style>
