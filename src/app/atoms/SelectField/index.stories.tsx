import React, { useState } from 'react';
import { ComponentMeta, StoryObj } from '@storybook/react-native';
import SelectField from './index';
import { SelectFieldProps, OptionType } from './types';

export default {
    title: 'Design System/Atoms/SelectField',
    component: SelectField,
} as ComponentMeta<typeof SelectField>;

export const Default: StoryObj<SelectFieldProps> = {
    render: ({ label, data }) => {

        const onSelect = (item: OptionType) => {
        };

        return (
            <>
                <SelectField
                    label={label}
                    data={data}
                    onSelect={onSelect}
                />
            </>
        );
    },
    args: {
        label: 'Select an Option',
        data: [
            { label: 'Recent', value: 'Recent' },
            { label: 'Popular', value: 'Popular' },
            { label: 'Recommended', value: 'Recommended' },
        ],
    },
};
