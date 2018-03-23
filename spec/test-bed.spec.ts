import { NgStateTestBed } from '../src/ng-state.test-bed';
import { HasStore, InjectStore } from '../src/decorators/inject-store.decorator';

describe('NgStateTestBed', () => {

    let component: any;
    const initialState = { todos: [] };

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment();
        component = {};
    });

    it('should return actions', () => {
        initialState.todos.push({ description: 'test description' });

        const actions = NgStateTestBed.createActions<TestActions>(TestActions, initialState, ['todos', 0]);
        expect(actions.todoDescription).toEqual('test description');
    });

    it('should set actions to component', () => {
        initialState.todos.push({ description: 'test description' });

        const actions = NgStateTestBed.createActions(TestActions, initialState, ['todos', 0]) as TestActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        expect(component.actions.todoDescription).toEqual('test description');
    });
});

describe('NgStateTestBed', () => {
    let component: any;

    beforeEach(() => {
        NgStateTestBed.setTestEnvironment();
        component = {};
    });

    it('should create actions with default state and path', () => {
        const actions = NgStateTestBed.createActions(TestActions) as TestActions;
        NgStateTestBed.setActionsToComponent(actions, component);

        (<TestActions>component.actions).todoDescription = 'test';
        expect((<TestActions>component.actions).todoDescription).toEqual('test');
    });
});

@InjectStore([])
export class TestActions extends HasStore<any> {
    get todoDescription() {
        return this.state.get('description');
    }

    set todoDescription(value) {
        this.store.update(state => {
            state.set('description', value);
        });
    }
}