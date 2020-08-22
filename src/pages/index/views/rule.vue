<template>
  <div class="page rule">
    <CityHeader :show-time="true" class="box b1" />
    <div class="box b2">
      <div class="text t1">
        为推动贯彻中国经济“三个转变”重要指示精神，加强品牌消费结构重要支撑，聚焦企业文化升级之路提升国家软实力。
      </div>
      <div class="text t2">
        活动汇集优质实力企业，甄选行业品牌标杆；配合市场发展大势制定专属创新营销计划将企业经营由广告销售向品牌服务升级，推动产品向品牌转变，助力品牌企业快速发展；参与品牌在活动期间内可持续推图，获奖品牌更有机会获得多渠道多方式宣传推广，高效率提升品牌曝光度；专业平台与团队让活动更有公信力。
      </div>
      <div class="text t3">
        [2020南昌市百强优秀企业推荐]本活动由搜搜科技平台提供技术支持，以创新方式拓宽企业宣传广度，凝聚优质资源，梳理行业企业标杆，提升企业对大众影响力为宗旨，促进行业健康蓬勃发展，提高行业企业经济质量与效益！
      </div>
    </div>
    <div class="box b3">
      <div class="text">
        聚焦行业信息资源为参与企业及品牌提升曝光度，助力企业开拓市场、占领市场、展现企业综合实力，集中体现市场影响力；甄选创新行业营销方式为参与品牌指定专属推广方案，传播企业自己的特色品牌声音；平台高点击率广告优先展示，高效率导流转化；为获奖品牌颁发荣誉证书等。
      </div>
    </div>
    <div class="box b4">
      <ul class="rule-items">
        <li>
          1.每成功投票一次可使对方票数加1
        </li>
        <li>
          2.排名结果以票数总数为准
        </li>
        <li>
          3.每天可投票时间：全天24小时
        </li>
        <li>
          4.每位用户每天仅可投票一次
        </li>
      </ul>
    </div>
    <div class="box b5">
      <div class="text">
        搜搜科技成立于2009年，注册资本1500万，公司致力于互联网科技研发服务与一体的现代化科技公司，公司全体员工全身心投入承办本届活动，将以专业、周到的服务办好本届活动，希望广大参与者积极参与，搜搜平台立志成为企业的强壮翅膀，专业的团队为您提供优质商业服务！
      </div>
    </div>
    <div class="box b6">
      <div class="text t1">
        投票榜排名前三位分别为冠军、季军、亚军，主办方平台定制纪念奖品，仅排名前三位可获得相应奖品。另外冠亚季军得主企业还可以获得一定的时间的平台展示推广。
      </div>
      <img src="@/assets/front/rule/rule_prize.png" />
      <div class="text t2">
        所有奖品及证书均为鼓励参赛者参与、纪念意义，<br />
        所有奖品并无实际经济价值，重在参与！
      </div>
    </div>
    <div class="box b7">
      <img src="@/assets/front/rule/rule_friends.png" />
    </div>
    <div class="copyright">
      本活动最终解释权归搜搜科技所有<br />
      ©2020 搜搜科技 www.sousou.com
    </div>
  </div>
</template>

<script>
import CityHeader from './c_city_header';

export default {
  name: 'Rule',
  components: {
    CityHeader,
  },
  created() {
    this.$share({
      link: this.$route.path,
    });
  },
};
</script>
<style lang="scss" scoped>
.rule {
  padding-bottom: 0;
  .box {
    width: 100%;
    background-position: 0 0;
    background-size: 100% 100%;
    margin-top: -1px;
    font-size: 12px;
    color: #272727;
    text-indent: 25px;
    padding: 0 15px;
  }
  .b1 {
    background-image: url(~@/assets/front/rule/rule_bg1.jpg);
    height: 215px;
    text-align: center;
    text-indent: 0;
    padding-top: 25px;
    .title {
      width: 100%;
      top: 20px;
      position: absolute;
      color: #0f1315;
      font-size: 24px;
      line-height: 28px;
    }
    .title-bg {
      width: 300px;
      margin-top: 20px;
    }
    .logo {
      width: 135px;
      height: 35px;
      border: 1px solid #fff;
    }
    .time {
      color: #fff;
    }
  }
  .b2 {
    background-image: url(~@/assets/front/rule/rule_bg2.jpg);
    height: 710px;
    padding: 0 30px;
    color: #272727;
    font-size: 12px;
    .text.t1 {
      padding: 100px 0 25px 0;
    }
    .text.t2 {
      padding: 0 0 160px 0;
    }
  }
  .b3 {
    background-image: url(~@/assets/front/rule/rule_bg3.jpg);
    height: 210px;
    padding: 0 30px;
    .text {
      padding-top: 100px;
    }
  }
  .b4 {
    background-image: url(~@/assets/front/rule/rule_bg4.jpg);
    height: 320px;
    .rule-items {
      padding-top: 100px;
      li {
        line-height: 40px;
        color: #fff;
        margin-bottom: 15px;
        background: #191f26;
      }
    }
  }
  .b5 {
    background-image: url(~@/assets/front/rule/rule_bg5.jpg);
    height: 410px;
    padding: 0 30px;
    .text {
      padding-top: 120px;
      color: #ffffff;
    }
  }
  .b6 {
    background-image: url(~@/assets/front/rule/rule_bg6.jpg);
    height: 380px;
    .text.t1 {
      padding: 90px 10px 20px 10px;
      color: #fff;
    }
    .text.t2 {
      padding-top: 10px;
      text-align: center;
      color: #d3bc8a;
      line-height: 14px;
    }
  }
  .b7 {
    height: 370px;
    background-image: url(~@/assets/front/rule/rule_bg7.jpg);
    padding: 100px 30px 0 30px;
    text-indent: 0;
  }
  .copyright {
    background: #262f3a;
    color: #646e7a;
    padding: 10px 0 30px 0;
    font-size: 12px;
    text-align: center;
  }
}
</style>
