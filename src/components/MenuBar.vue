<template land="html">
  <div>
    <h1>菜單</h1>

    <div class="control">
      <div>
        <label for="">最小</label>
        <input type="text" v-model="minPrice">
        <label for="">最大</label>
        <input type="text" v-model="maxPrice">
      </div>

      <div>
        <label for="">搜尋</label>
        <input type="text" v-model="keyword">

      </div>

      <span v-for="(card, cid) in cards">
        <span>{{cid}}</span>
        <input type="input" v-model.number="card.price">
      </span>
    </div>

    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="麵類" name="麵"></el-tab-pane>
      <el-tab-pane label="飯類" name="飯"></el-tab-pane>
      <el-tab-pane label="湯品" name="湯"></el-tab-pane>
    </el-tabs>

    <div class="menu">
      <!-- <h4 v-if="keyword"> 搜尋結果：</h4> -->
      <div class="cards">
        <div class="card" v-for="(card,rid) in cards" v-if="(card.price>=minPrice) && (card.price<=maxPrice) &&(card.title.indexOf(keyword)!=-1)">
          <div class="info">
            <!-- {{rid}} -->
            <h3>{{card.title}}</h3>
            <div class="price">{{card.price}}</div>
            <!-- <el-input min="1" v-model="card.quantity"></el-input> -->
            <div class="flex-btn">

              <el-input-number size="mini" v-model="card.quantity" :min="1" :max="10"></el-input-number>
              <!-- <el-button @click="card.quantity--" icon="el-icon-minus"></el-button> -->
              <el-button type="success" @click="additem(rid)" icon="el-icon-tickets" circle></el-button>
              <!-- <el-button @click="card.quantity++" icon="el-icon-plus"></el-button> -->

            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="orderlist" v-for="order in orders">
      <span>{{order.title}}</span>
      <span>{{order.price}}</span>
      <span>數量:{{order.quantity}}</span>
    </div>

    <div class="ordertotal">總價:{{total}}</div>
    <el-button type="primary" @click="submit(total)">送出</el-button>


    <div class="ordercards" v-for="(ordercard,rid) in ordercards">
      訂單編號: {{rid}}
      <div class="ordercard" v-for="card in ordercard">
        <span>{{card.title}}</span>
        <span>{{card.price}}</span>
        <span>數量:{{card.quantity}}</span>
        單品總價:{{card.price*card.quantity}}
      </div>
      全總價: {{paytotal(rid)}}
      <div>
        <el-button class="clearorder" type="primary" @click="clearorder(rid)">結單</el-button>
      </div>

    </div>

    <div class="daytotal">
      日結{{daytotal}}
    </div>
  </div>

</template>

<script>
  export default {
    // props: ["items"],
    data() {
      return {
        label: "[商品]",
        minPrice: 20,
        maxPrice: 200,
        ordernum: 0,
        keyword: '',
        orders: [],
        ordercards: [],
        daytotal: 0,
        cards: [{
            id: 0,
            title: "滷肉飯",
            cover: "",
            price: 35,
            soldout: true,
            quantity: 1
          },
          {
            id: 1,
            title: "肉羹麵",
            cover: "",
            price: 40,
            soldout: true,
            quantity: 1
          }
        ]
      }
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name == this.keyword) return this.keyword = '';
        this.keyword = tab.name;
      },
      additem(rid) {
        if (this.orders.every(order => order.id !== this.cards[rid].id)) {
          this.orders.push(this.cards[rid]);
        }

      },

      submit(total) {
        if (!this.$data.orders.length) {
          return
        }
        let order = JSON.parse(JSON.stringify(this.$data.orders));
        this.ordercards.push(order);
        // this.ordercards[this.ordernum] = this.orders.slice();
        this.ordernum++;
        this.orders = [];

      },
      clearorder(rid) {
        this.daytotal = this.daytotal + this.ordercards[rid].reduce((ordertotal, ordercards) => ordertotal + ordercards
          .price * ordercards.quantity, 0);
        this.ordercards.splice(rid, 1);
      },
      paytotal(rid) {
        return this.ordercards[rid].reduce((ordertotal, ordercards) => ordertotal + ordercards.price * ordercards.quantity,
          0);
      }
    },
    computed: {
      total() {
        return this.orders.reduce((total, orders) => total + orders.price * orders.quantity, 0);

      },
    }

  }

</script>

<style lang="scss" scoped>
  .cards {
    display: flex;

  }

  .card {
    width: 33.33%;
    margin: 10px;
    box-shadow: 0 0 20px rgba(#000, 0.2);
    padding: 10px;

    .price {
      margin-bottom: 15px;
    }
  }

  .el-button {
    padding: 5px;
    margin: 10px;
  }

  .ordercards {
    position: relative;
    width: 50%;
    border: 1px solid #000;
    margin-bottom: 10px;
    padding: 5px;
    padding-bottom: 50px;
    margin-top: 10px;

    .clearorder {
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding: 5px 10px;
      margin: 0;
    }
  }

  .flex-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>
