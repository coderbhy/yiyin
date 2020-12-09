export default function () {
  return {
    // 用户点赞的视频
    userThumb: [
      {
        id: '1',
        cover: ''
      },
      {
        id: '2',
        cover: ''
      },
      {
        id: '3',
        cover: ''
      },
      {
        id: '4',
        cover: ''
      }
    ],
    // 视频类型数组
    videoType: [
      {
        id: '1',
        type: '生活'
      },
      {
        id: '2',
        type: '学习'
      },
      {
        id: '4',
        type: '娱乐'
      },
      {
        id: '5',
        type: '影视'
      },
      {
        id: '8',
        type: '哈哈'
      }
    ],
    // 首页中用户观看的视频
    allVideos: [
      {
        user: {
          yb_userhead: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
          yb_usernick: 'nickname'
        },
        video: {
          id: '1',
          num: '2213',
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4',
          title: '标题1',
          v_type: '军事'
        }
      },
      {
        user: {
          yb_userhead: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
          yb_usernick: 'nickname'
        },
        video: {
          id: '2',
          num: '9999',
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4',
          title: '标题2',
          v_type: '军事'
        }
      },
      {
        user: {
          yb_userhead: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
          yb_usernick: 'nickname'
        },
        video: {
          id: '3',
          num: '53482213',
          src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4',
          title: '标题2',
          v_type: '军事'
        }
      }
    ],
    // userInfo
    userInfo: {
      yb_userid: '123',
      yb_usernick: 'nickname哈哈',
      yb_userhead: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg'
      // likeType: null
    },
    // 所有 type 类型
    allTypes: [
      {
        type: '生活'
      },
      {
        type: '艺术'
      },
      {
        type: '生活'
      },
      {
        type: '艺术'
      },
      {
        type: '生活'
      },
      {
        type: '艺术'
      },
    ],
    // 用户自己的作品集合
    ownWorks: [
      {
        id: '1'
      }
    ]
  }
}
