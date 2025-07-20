declare type HeadButton = {
    icon: string;
    click: Function;
    title: string;
    type: string;
    disabled: boolean;
}

declare type RightComponents = {
    icon?: string;
    name: string;
    click?: Function;
    model: any;
    type?: string;
    disabled: boolean;
}

declare type HeadComponents<T extends HeadButton | RightComponents = any> = []