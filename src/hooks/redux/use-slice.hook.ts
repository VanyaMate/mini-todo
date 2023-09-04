import { RootState } from '@/store/index.store.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';


export const useSlice: TypedUseSelectorHook<RootState> = useSelector;