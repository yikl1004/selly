import { Module, VuexModule, MutationAction, getModule, Mutation } from 'vuex-module-decorators'
import BoardService, { BoardResponse, BoardParameters } from '@services/board'
import store from '@stores/index'
import { $dayjs } from '@utils/plugins/dayjs'
import toNumber from 'lodash/toNumber'

export interface BoardState {
    noticePageNo: string
    noticeList: NoticeListRes | null
    noticeDetail: NoticeDetailRes | null
    faqCategoryCode: string
    faqPageNo: string
    faqList: FaqListRes | null
    faqCategory: FaqCategoryRes | null
    policyPageNo: string
    policyList: PolicyListRes | null
    policyDetail: PolicyDetailRes | null
}

type NoticeListRes = BoardResponse['noticeList']
type NoticeDetailRes = BoardResponse['noticeDetail']
type FaqListRes = BoardResponse['faqList']
type FaqCategoryRes = BoardResponse['faqCategory']
type PolicyListRes = BoardResponse['policyList']
type PolicyDetailRes = BoardResponse['policyDetail']
type PolicyDetailDirectRes = BoardResponse['policyDetailDirect']

@Module({ name: 'board', namespaced: true, dynamic: true, store })
export default class Board extends VuexModule {
    public noticePageNo = '1'
    public noticeList: NoticeListRes | null = null
    public noticeDetail: NoticeDetailRes | null = null
    public faqCategoryCode = ''
    public faqPageNo = '1'
    public faqList: FaqListRes | null = null
    public faqCategory: FaqCategoryRes | null = null
    public policyPageNo = '1'
    public policyList: PolicyListRes | null = null
    public policyDetail: PolicyDetailRes | null = null
    public policyDetailDirect: PolicyDetailDirectRes | null = null

    @Mutation
    changeFaqCategory(categoryCode: string) {
        if (this.faqCategoryCode !== categoryCode) {
            this.faqPageNo = '1'
        }
        this.faqCategoryCode = categoryCode
    }

    @Mutation
    changeFaqPageNo({ more }: { more: boolean }) {
        if (more) {
            this.faqPageNo = `${toNumber(this.faqPageNo) + 1}`
        }
    }

    @Mutation
    initializePolicy() {
        this.policyDetail = null
        this.policyDetailDirect = null
    }

    @MutationAction
    async getNoticeList() {
        const state = this.state as BoardState
        const pageNo = state.noticePageNo
        const nextPageNo = `${toNumber(pageNo) + 1}`
        const isFirstPage = pageNo === '1'
        const { data } = await BoardService.getNoticeList({ pageNo })

        return {
            noticeList: isFirstPage
                ? data
                : {
                      ...data,
                      data: {
                          ...data.data,
                          list: state.noticeList?.data.list.concat(data.data.list),
                      },
                  },
            noticePageNo: data.data.moreYn === 'Y' ? nextPageNo : pageNo,
        }
    }

    @MutationAction
    async getNoticeDetail(params: BoardParameters['noticeDetail']) {
        const { data } = await BoardService.getNoticeDetail(params)
        return {
            noticeDetail: data,
        }
    }

    @MutationAction
    async getFaqList() {
        const { faqPageNo, faqList } = this.state as BoardState
        const { faqPageNo: pageNo, faqCategoryCode: faqCtgDc } = this.state as BoardState
        const { data } = await BoardService.getfaqList({
            pageNo,
            faqCtgDc,
        })

        return {
            faqList:
                faqPageNo === '1'
                    ? data
                    : {
                          ...data,
                          data: {
                              ...data.data,
                              list: faqList?.data.list.concat(data.data.list),
                          },
                      },
        }
    }

    @MutationAction
    async getFaqCategory() {
        const { data } = await BoardService.getFaqCategory()
        data.data.list.unshift({
            faqCtgDc: '',
            faqCtgNm: '전체',
        })
        return {
            faqCategory: data,
        }
    }

    @MutationAction
    async getPolicyList(params?: { more?: boolean }) {
        const { policyPageNo, policyList } = this.state as BoardState
        const nextPage = `${toNumber(policyPageNo) + (params?.more ? 1 : 0)}`
        const { data } = await BoardService.getPolicyList({
            pageNo: nextPage,
            comGrpC: 'AGR_COM',
        })

        return {
            policyList: params?.more
                ? {
                      ...data,
                      data: {
                          ...data.data,
                          list: policyList?.data.list.concat(data.data.list),
                      },
                  }
                : data,
            policyPageNo: nextPage,
        }
    }

    @MutationAction
    async getPolicyDetail(params: BoardParameters['policyDetail']) {
        const { data } = await BoardService.getPolicyDetail(params)
        return {
            policyDetail: data,
        }
    }

    // 직접 호출 케이스 3번
    @MutationAction
    async getPolicyDetailDirect(params: BoardParameters['policyDetailDirect']) {
        const { data } = await BoardService.getPolicyDetailDirect(params)
        return {
            policyDetailDirect: data,
        }
    }

    // 공지사항 리스트 반환
    get noticeListData() {
        return this.noticeList
            ? this.noticeList.data.list.map(item => ({
                  title: item.anTitNm,
                  date: $dayjs(item.fstCrtDtti).format('YYYY-MM-DD'),
                  seq: item.anSeq,
              }))
            : []
    }

    // 더보기 버튼 노출 여부
    get noticeMoreYN() {
        return this.noticeList?.data.moreYn === 'Y'
    }

    // 상세내용
    get noticeDetailData() {
        return {
            title: this.noticeDetail?.data.anTitNm,
            date: this.noticeDetail?.data.fstCrtDtti,
            content: this.noticeDetail?.data.anCn,
        }
    }

    // FAQ 카테고리 리스트
    get faqCategoryData() {
        return this.faqCategory
            ? this.faqCategory?.data.list.map(item => ({
                  name: item.faqCtgNm,
                  categoryCode: item.faqCtgDc,
              }))
            : []
    }

    // FAQ 리스트
    get faqListData() {
        return this.faqList
            ? this.faqList.data.list.map(item => ({
                  category: item.faqCtgNm,
                  title: item.faqTitNm,
                  desc: item.faqCnV,
              }))
            : []
    }

    // FAQ 더보기 노출 여부
    get faqMoreYN() {
        return this.faqList?.data.moreYn === 'Y'
    }

    // 이용약관 목록
    get policyListData() {
        return this.policyList
            ? this.policyList.data.list.map(item => ({
                  title: item.prvTitNm,
                  index: item.prvSeq,
              }))
            : []
    }

    // 이용약관 더보기 노출 여부
    get policyMoreYN() {
        return this.policyList?.data.moreYn === 'Y'
    }

    // 이용약관 상세
    get policyDetailData() {
        return {
            title: this.policyDetail?.data.prvTitNm,
            content: this.policyDetail?.data.prvCn,
        }
    }

    /** 이용약관 상세 - 직접 호출 */
    get policyDetailDirectData() {
        return {
            title: this.policyDetailDirect?.data.prvTitNm,
            content: this.policyDetailDirect?.data.prvCn,
        }
    }
}

export const BoardModule = getModule(Board)
