import { Component, ReactNode } from "react";
import type { ColumnsType } from 'antd/es/table';
import { GetOpenIddictListInput, OpenIddictApplication } from "@/module/OpenIddictApplication";
import { Table, Tooltip, Tag, message, Space, Input, Button } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import openiddictApi from "@/apis/openiddictApi";
import { PagedResultDto } from "@/module/PagedResultDto";

const { Search } = Input;

const columns: ColumnsType<OpenIddictApplication> = [
    {
        title: 'ClientId',
        width: 100,
        dataIndex: 'clientId',
        key: 'clientId',
        fixed: 'left',
    },
    {
        title: 'ConsentType',
        dataIndex: 'consentType',
        key: 'consentType',
        width: 150,
    },
    {
        title: 'DisplayName',
        dataIndex: 'displayName',
        key: 'displayName',
        width: 150,
    },
    {
        title: '回调地址',
        dataIndex: 'redirectUris',
        key: 'redirectUris',
        width: 150,
    },
    {
        title: 'DisplayName',
        dataIndex: 'displayName',
        key: 'displayName',
        width: 150,
    },
    {
        title: 'DisplayName',
        dataIndex: 'displayName',
        key: 'displayName',
        width: 150,
    },
    {
        title: '权限项',
        dataIndex: 'permissions',
        key: 'permissions',
        render: (value) => {
            var s = JSON.parse(value) as [];
            var dom = s.map(x => {
                return <Tag color="processing">{x}</Tag>
            })
            return (
                <Tooltip placement="topLeft" title={dom} color='blue' arrowPointAtCenter>
                    <Tag color="processing">查看权限项</Tag>
                </Tooltip>)
        },
        width: 150,
    },
    {
        title: '应用类型',
        dataIndex: 'type',
        key: 'type',
        width: 150,
    }
];

interface IProps {

}

interface IState {
    rowSelection: TableRowSelection<OpenIddictApplication>,
    addDrawer: boolean,
    input: GetOpenIddictListInput,
    loading: boolean,
    data: PagedResultDto<OpenIddictApplication>,
}


export default class ClientList extends Component<IProps, IState> {
    state: Readonly<IState> = {
        rowSelection: {
            selectedRowKeys: [],
            onChange: (key) => this.rowSelected(key)
        },
        addDrawer: false,
        loading: false,
        input: {
            keywords: '',
            page: 1,
            pageSize: 20
        },
        data: {
            items: [],
            totalCount: 0
        }
    }

    getList() {
        this.setState({
            loading: true
        })
        var { input } = this.state;

        openiddictApi.getlist(input)
            .then(res => {
                this.setState({
                    data: res,
                    loading: false
                })
            }).catch(error => {
                this.setState({
                    loading: false
                })
            })
    }

    constructor(props: IProps) {
        super(props)
        this.getList()
    }

    rowSelected(value: any) {

    }

    render() {
        var { rowSelection, loading, data, input } = this.state;
        return (<div>
            <Space style={{ marginBottom: 16 }}>
                <Search loading={loading} placeholder="搜索客户端列表" value={input.keywords} onChange={(value) => {
                    if (input) {
                        input.keywords = value.target.value;
                        this.setState({
                            input
                        })
                    }
                }} onSearch={() => this.getList()} enterButton />

            </Space>
            <Table rowSelection={rowSelection} dataSource={data.items} loading={loading} columns={columns} scroll={{ x: 1500, y: 600 }} />
        </div>)
    }
}