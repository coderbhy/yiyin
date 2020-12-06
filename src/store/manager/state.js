export default function () {
  return {
    allTypes: [
      {
        v_type: '测试类型1',
        type_status: '1'
      },
      {
        v_type: '测试类型2',
        type_status: '1'
      },
      {
        v_type: '测试类型3',
        type_status: '0'
        // 0 隐藏
      },
      {
        v_type: '测试类型4',
        type_status: '1'
        // 0 隐藏
      },
      {
        v_type: '测试类型5',
        type_status: '1'
      },
      {
        v_type: '测试类型6',
        type_status: '1'
      },
      {
        v_type: '测试类型7',
        type_status: '1'
      }
    ],
    checkModuleDark: false,
    // 从后台获取的总的已审核数据长度
    totalCheckDataNumber: 35,
    // 从后端获取的总的未审核数据长度
    totalUncheckDataNumber: 15,
    allPassData: [
      {
        status: '0',
        id: '123',
        upload_date: '2020/12/5 14:02',
        v_type: '生活',
        cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607178042955&di=8bc1a9d488b9a972743318fa4620efdd&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201407%2F23%2F234926zey8nqpz9kq9098q.jpg',
        title: '测试视频1',
        src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
      }
    ],
    allUnpassData: [
      {
        status: '1',
        id: '124',
        upload_date: '2020/12/5 14:02',
        v_type: '娱乐',
        cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607178042955&di=8bc1a9d488b9a972743318fa4620efdd&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201407%2F23%2F234926zey8nqpz9kq9098q.jpg',
        title: '测试视频2',
        src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
      }
    ],
    allUncheckData: [
      {
        status: '2',
        id: '125',
        upload_date: '2020/12/5 14:02',
        v_type: '生活',
        cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607178042955&di=8bc1a9d488b9a972743318fa4620efdd&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201407%2F23%2F234926zey8nqpz9kq9098q.jpg',
        title: '测试视频3',
        src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4'
      }
    ],
    // 当前页数
    currentPage: 1,
    // 最大页数
    maxPage: 3,
    // 未审核界面最大页数
    UncheckMaxPage: 4,
    // 未审核界面当前页数
    UncheckCurrent: 1
  }
}
