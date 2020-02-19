// components/book-item.js
const like = '/images/icon/like.png'
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        frontCover: {
            type: String,
            value: like
        },
        name: {
            type: String,
            value: '黑客与画家'
        },
        author: {
            type: String,
            value: '[美]保罗·格雷厄姆'
        },
        count: {
            type: Number,
            value: 0
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})