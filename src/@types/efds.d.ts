/**
 * @description EFDS 모듈 타입 정의
 */

declare namespace iTracerAF {
    namespace Types {
        interface InitCallbackResult {
            wdata: string
            ukey: string
        }
        type InitCallback = (data: InitCallbackResult) => void
    }

    function init(callback: iTracerAF.Types.InitCallback): void
}
