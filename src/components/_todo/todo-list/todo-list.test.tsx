import TodoList from '@/components/_todo/todo-list/todo-list.tsx';
import { TodoListType } from '@/store/todo/todo.slice.ts';
import { renderWithProviders } from '@/utils/tests.utils.tsx';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';


describe('Todo-List', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value   : vi.fn().mockImplementation(query => ({
                matches            : false,
                media              : query,
                onchange           : null,
                addListener        : vi.fn(),
                removeListener     : vi.fn(),
                addEventListener   : vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent      : vi.fn(),
            })),
        });
    });

    it('Simple render', async () => {
        renderWithProviders(<TodoList/>, {
            preloadedState: {
                todo: {
                    list: [
                        {
                            id    : 1,
                            title : 'title',
                            status: false,
                        },
                        {
                            id    : 2,
                            title : 'title',
                            status: true,
                        },
                    ],
                    type: TodoListType.ALL,
                },
            },
        });

        const items: HTMLElement[] = await screen.findAllByText(/title/i);
        expect(items.length).toBe(2);
    });

    it('Adding new item', async () => {
        renderWithProviders(<TodoList/>);

        // Check no data
        {
            const clear: HTMLElement[] = await screen.findAllByText(/no data/i);
            expect(clear.length).toBe(1);
        }
        // Input "title" and press enter
        {
            const input: HTMLInputElement = await screen.findByPlaceholderText(/enter task description/i);
            expect(input).toBeInTheDocument();
            await userEvent.type(input, 'title');
            await userEvent.type(input, '{enter}');
        }
        // Check item
        {
            const items: HTMLElement[] = await screen.findAllByText(/title/i);
            expect(items.length).toBe(1);
        }
    });

    it('Check tasks', async () => {
        renderWithProviders(<TodoList/>, {
            preloadedState: {
                todo: {
                    list: [
                        {
                            id    : 1,
                            title : 'title',
                            status: false,
                        },
                        {
                            id    : 2,
                            title : 'title',
                            status: true,
                        },
                    ],
                    type: TodoListType.ALL,
                },
            },
        });

        expect((await screen.findAllByText('title')).length).toBe(2);

        // Find unchecked, click, check for checked
        {
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            const unchecked: HTMLInputElement    = checkboxes.filter((checkbox) => !checkbox.checked)[0];
            expect(unchecked).toBeInTheDocument();
            const parent: HTMLElement = unchecked.parentElement!;
            expect(parent).toBeInTheDocument();
            expect(!parent.classList.contains('ant-checkbox-checked')).toBeTruthy();
            await userEvent.click(unchecked);
            expect(parent.classList.contains('ant-checkbox-checked')).toBeTruthy();
        }
        // Check 2 items for checked
        {
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            const checked: HTMLInputElement[]    = checkboxes.filter((checkbox) => checkbox.parentElement?.classList.contains('ant-checkbox-checked'));
            expect(checked.length).toBe(2);
        }
    });

    it('Remove completed tasks', async () => {
        renderWithProviders(<TodoList/>, {
            preloadedState: {
                todo: {
                    list: [
                        {
                            id    : 1,
                            title : 'title',
                            status: false,
                        },
                        {
                            id    : 2,
                            title : 'title',
                            status: true,
                        },
                    ],
                    type: TodoListType.ALL,
                },
            },
        });

        expect((await screen.findAllByText('title')).length).toBe(2);

        // Check
        {
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            const unchecked: HTMLInputElement    = checkboxes.filter((checkbox) => !checkbox.checked)[0];
            expect(unchecked).toBeInTheDocument();
            await userEvent.click(unchecked);
        }
        // Click on remove button
        {
            const removeCompleted: HTMLButtonElement = await screen.findByRole('button');
            expect(removeCompleted).toBeInTheDocument();
            await userEvent.click(removeCompleted);
        }
        // Check no data
        {
            const nodata: HTMLElement = await screen.findByText(/no data/i);
            expect(nodata).toBeInTheDocument();
        }

    });

    it('Categories', async () => {
        renderWithProviders(<TodoList/>, {
            preloadedState: {
                todo: {
                    list: [
                        {
                            id    : 1,
                            title : 'title',
                            status: false,
                        },
                        {
                            id    : 2,
                            title : 'title',
                            status: true,
                        },
                        {
                            id    : 3,
                            title : 'title',
                            status: true,
                        },
                    ],
                    type: TodoListType.ALL,
                },
            },
        });
        // [All]
        {
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            expect(checkboxes.length).toBe(3);
        }
        // [Active]
        {
            const toActiveCategoryLabel: HTMLElement = await screen.findByText(/active/i);
            expect(toActiveCategoryLabel).toBeInTheDocument();
            await userEvent.click(toActiveCategoryLabel);
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            expect(checkboxes.length).toBe(1);
        }

        // [Completed]
        {
            const toCompletedCategoryLabel: HTMLElement = await screen.findByText(/^completed$/i);
            expect(toCompletedCategoryLabel).toBeInTheDocument();
            await userEvent.click(toCompletedCategoryLabel);
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            expect(checkboxes.length).toBe(2);
        }
    });

    it('Counters', async () => {
        renderWithProviders(<TodoList/>, {
            preloadedState: {
                todo: {
                    list: [
                        {
                            id    : 1,
                            title : 'title',
                            status: false,
                        },
                        {
                            id    : 2,
                            title : 'title',
                            status: true,
                        },
                        {
                            id    : 3,
                            title : 'title',
                            status: true,
                        },
                    ],
                    type: TodoListType.ALL,
                },
            },
        });

        // First check
        {
            const all: HTMLElement = await screen.findByText(/amount: 3/i);
            const left: HTMLElement = await screen.findByText(/1 items left/i);
            expect(all).toBeInTheDocument();
            expect(left).toBeInTheDocument();
        }
        // Check
        {
            const checkboxes: HTMLInputElement[] = await screen.findAllByRole('checkbox');
            const unchecked: HTMLInputElement    = checkboxes.filter((checkbox) => !checkbox.checked)[0];
            expect(unchecked).toBeInTheDocument();
            await userEvent.click(unchecked);
        }
        // After check
        {
            const all: HTMLElement = await screen.findByText(/amount: 3/i);
            const left: HTMLElement = await screen.findByText(/0 items left/i);
            expect(all).toBeInTheDocument();
            expect(left).toBeInTheDocument();
        }
        // Click on remove button
        {
            const removeCompleted: HTMLButtonElement = await screen.findByRole('button');
            expect(removeCompleted).toBeInTheDocument();
            await userEvent.click(removeCompleted);
        }
        // After remove completed
        {
            const all: HTMLElement = await screen.findByText(/amount: 0/i);
            const left: HTMLElement = await screen.findByText(/0 items left/i);
            expect(all).toBeInTheDocument();
            expect(left).toBeInTheDocument();
        }
    });
});