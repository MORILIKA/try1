import Vue from 'vue';
import Vuex from 'vuex';
// import router from '@/router'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        count: 0,
        identifyImage:'',
        invoiceResult:'',
        loadingStatus: false,
        busyStatus: false,
        cacheView: null,
    },
    getters: {
        BigCount: state => {
            return state.count + 10
        }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        },
        getIdentifyImage(context,image){
            context.commit('getIdentifyImage',image)
        },
        getInvoiceResult(context,result){
            context.commit('getInvoiceResult',result)
        },
        changeLoading(context,status){
            context.commit('changeLoading',status)
        },
        changeBusy(context,status){
            context.commit('changeBusy',status)
        },
        changeCacheView(context,view){
            context.commit('changeCacheView',view)
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        getIdentifyImage(state,image){
            state.identifyImage=image
        },
        getInvoiceResult(state,result){
            state.invoiceResult=result
        },
        changeLoading(state,status){
            state.loadingStatus=status
        },
        changeBusy(state,status){
            state.busyStatus=status
        },
        changeCacheView(state,view){
            state.cacheView=view
        }
        
    },
})

