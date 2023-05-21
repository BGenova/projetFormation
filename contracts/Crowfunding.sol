// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title Crowdfunding
 * @dev A contract for a crowdfunding platform.
 */
contract Crowdfunding {
    struct Project {
        address owner;
        string name;
        string description;
        string imageUrl;
        uint256 fundingGoal;
        uint256 fundsRaised;
        uint256 endTime;
        uint256 totalSupply;
        mapping(address => uint256) contributions;
        mapping(address => uint256) rewards;
        bool closed;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCounter;

    event ProjectCreated(uint256 indexed projectId, address indexed owner);
    event ContributionMade(uint256 indexed projectId, address indexed contributor, uint256 amount);
    event FundingSuccessful(uint256 indexed projectId, uint256 amountRaised);
    event RewardClaimed(uint256 indexed projectId, address indexed contributor, uint256 reward);

    /**
     * @dev Checks if the project is open.
     * @param _projectId The project ID.
     */
    modifier onlyOpenProject(uint256 _projectId) {
        require(!projects[_projectId].closed, "The project is closed");
        _;
    }

    /**
     * @dev Creates a new crowdfunding project.
     * @param _fundingGoal The funding goal of the project.
     * @param _endTime The end time of the project's fundraising period.
     * @param _totalSupply The total token supply of the project.
     */
    function createProject(string memory _name, string memory _description, string memory _imageUrl,uint256 _fundingGoal, uint256 _endTime, uint256 _totalSupply) external {
        require(_fundingGoal > 0, "The funding goal must be greater than zero");
        require(_endTime > block.timestamp, "The end time must be in the future");
        require(_totalSupply > 0, "The total supply must be greater than zero");

        uint256 newProjectId = projectCounter;

        Project storage project = projects[newProjectId];
        project.owner = msg.sender;
        project.fundingGoal = _fundingGoal;
        project.endTime = _endTime;
        project.totalSupply = _totalSupply;
        project.name = _name;
        project.description = _description;
        project.imageUrl = _imageUrl;

        projectCounter++;

        emit ProjectCreated(newProjectId, msg.sender);
    }

    /**
     * @dev Contributes to the funding of a project.
     * @param _projectId The project ID.
     */
    function contribute(uint256 _projectId) external payable onlyOpenProject(_projectId) {
        Project storage project = projects[_projectId];
        require(block.timestamp < project.endTime, "The project has ended");
        require(msg.value > 0, "The contribution amount must be greater than zero");

        project.contributions[msg.sender] += msg.value;
        project.fundsRaised += msg.value;

        emit ContributionMade(_projectId, msg.sender, msg.value);
    }

    /**
     * @dev Claims the reward for a given contribution to a project.
     * @param _projectId The project ID.
     */
    function claimReward(uint256 _projectId) external onlyOpenProject(_projectId) {
        Project storage project = projects[_projectId];
        require(block.timestamp >= project.endTime, "The project has not ended yet");
        require(project.contributions[msg.sender] > 0, "No contribution made");

        uint256 reward = (project.rewards[msg.sender] * project.totalSupply) / project.fundsRaised;
        project.rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);

        emit RewardClaimed(_projectId, msg.sender, reward);
    }

    /**
     * @dev Closes a project.
     * @param _projectId The project ID.
     */
    function closeProject(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(!project.closed, "The project is already closed");
        require(block.timestamp >= project.endTime, "The project has not ended yet");
        project.closed = true;
        emit FundingSuccessful(_projectId, project.fundsRaised);
    }
}
