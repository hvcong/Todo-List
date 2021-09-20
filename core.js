import reducer from "./reducer.js";

export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, value) => acc.concat(value, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)// sẽ xóa những giá trị true, false, sẽ không hiển thị những giá trị đó
        .join('');
}

export function createStore(reducer) {
    // state là database để chứa các dữ liệu gốc
    let state = reducer() // lúc đầu mặc định sẽ là cái state mặc định
    // sẽ lưu [domSelector, component] // phục vụ việc chứa những dữ liệu đã được yêu cầu lấy ra, và vị trí hiển thị nó
    const roots = new Map() 

    function render() {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        // đẩy dữ liệu vào roots và render() lại view
        attach(component, root) {
            roots.set(root, component)
            render()
        },
        // kết nối view với store để hiện thị ra một số nội dung cần thiết, có những lúc không cần hiển thị ra tất cả dữ liệu
        connect(selector = state => state) {
            return function (component) {
                return function (props, ...args) {
                    return component(Object.assign({}, props, state, ...args))
                }
            } 
        },
            //Thay bằng phía dưới
        
            // connect (component){
            //     return function(...args) {
            //         return component(Object.assign({},state,...args))
            //     }
            // }

            // connect (component => ...args =>
            //      component(Object.assign({},state,...args)
            // )    
            
        
        // view muốn làm việc yêu cần thì phải có dispatch(), dùng để gửi yêu cầu, kèm dữ liệu cần thiết
        dispatch(action, ...args) {
            state = reducer(state, action, args)// reducer sẽ cập nhật tiếp state cũ, và trả về state mới đã được cập nhật
            render() // sau khi cập nhật thì sẽ render() lại view
        }
    }
}
