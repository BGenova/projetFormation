import {Project} from "../../model/projectModel";




describe('Project', () => {
        let project;

        beforeEach(() => {
                project = new Project('0x123456789', 1000, 100, 1736489200);
        });

        it('should initialize with correct values', () => {
                expect(project.owner).toBe('0x123456789');
                expect(project.fundingGoal).toBe(1000);
                expect(project.fundsRaised).toBe(0);
                expect(project.endTime).toBe(1736489200);
                expect(project.totalSupply).toBe(100);
                expect(project.contributions).toEqual({});
                expect(project.rewards).toEqual({});
                expect(project.closed).toBe(false);
        });

        it('should set and get owner correctly', () => {
                project.owner = '0x987654321';
                expect(project.owner).toBe('0x987654321');
        });

        it('should set and get fundingGoal correctly', () => {
                project.fundingGoal = 2000;
                expect(project.fundingGoal).toBe(2000);
        });

        it('should set and get fundsRaised correctly', () => {
                project.fundsRaised = 500;
                expect(project.fundsRaised).toBe(500);
        });

        it('should set and get endTime correctly', () => {
                project.endTime = 1736490000;
                expect(project.endTime).toBe(1736490000);
        });

        it('should set and get totalSupply correctly', () => {
                project.totalSupply = 200;
                expect(project.totalSupply).toBe(200);
        });

        it('should set and get contributions correctly', () => {
                const contributions = {
                        '0x111111111': 50,
                        '0x222222222': 30,
                };

                project.contributions = contributions;
                expect(project.contributions).toEqual(contributions);
        });

        it('should set and get rewards correctly', () => {
                const rewards = {
                        '0x111111111': 10,
                        '0x222222222': 5,
                };

                project.rewards = rewards;
                expect(project.rewards).toEqual(rewards);
        });

        it('should set and get closed correctly', () => {
                project.closed = true;
                expect(project.closed).toBe(true);
        });
});
