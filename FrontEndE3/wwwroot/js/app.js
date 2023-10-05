
function ApiClient() {
    let baseUrl = "/Api/";
    function crearQuery(data) {
        if (data == null) return '';
        else if (typeof (data) == 'string') {
            if (data.length > 0) {
                if (!data.startsWith('?')) data = '?' + data;
                return data;
            } else return '';
        } else if (typeof (data) == 'object') {
            let ar = [];
            for (let e in data) {
                let v = data[e];
                if (v == null) continue;
                ar.push(e + '=' + v);
            }
            let s = ar.join('&');
            return crearQuery(s);
        } else return '';
    }
    this.get = function (metodo, queryData) {
        let url = baseUrl + metodo + crearQuery(queryData);
        return new Promise((res, rej) => {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                contentType: 'application/json',
                success: d => res(d),
                error: e => rej(e)
            })
        })
    }
    this.post = function (metodo, data, queryData) {
        let url = baseUrl + metodo + crearQuery(queryData);
        let jsonData = data == null ? '{}' : JSON.stringify(data);
        return new Promise((res, rej) => {
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: jsonData,
                success: d => res(d),
                error: e => rej(e)
            })
        })
    }
    this.getCategorias = async function () {
        return await this.get('Categoria');
    }
    this.getProductos = async function (idCategoria, buscar, desdePrecio, hastaPrecio, soloDestacados) {
        return await this.get('Producto', {
            idCategoria: idCategoria,
            buscar: buscar,
            desdePrecio: desdePrecio,
            hastaPrecio: hastaPrecio,
            soloDestacados: soloDestacados
        })
    }
}

function crearAppProductos() {
    return new Vue({
        el: '#app',
        data: {
            categorias: [],
            productos: [],
            idCategoria: null,
            buscar: null,
            desdePrecio: null,
            hastaPrecio: null
        },
        methods: {
            cargarCategorias: async function () {
                this.categorias = await api.getCategorias();
            },
            cargarProductos: async function () {
                this.productos = await api.getProductos(this.idCategoria, this.buscar, this.desdePrecio, this.hastaPrecio, null);
            },
            seleccionaCategoria: async function (id) {
                this.idCategoria = id;
                await this.cargarProductos();
            },
            limpiarFiltro: async function () {
                this.idCategoria = null;
                this.buscar = null;
                this.desdePrecio = null;
                this.hastaPrecio = null;
                await this.cargarProductos();
            }
        },
        mounted: function () {
            Promise.all([
                this.cargarCategorias(),
                this.cargarProductos()
            ])
        }
    })
}

var api = new ApiClient();
