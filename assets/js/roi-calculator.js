// ROI Calculator for Juro MCP Server
class ROICalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.calculateInitialROI();
    }

    initializeElements() {
        this.teamSizeSelect = document.getElementById('teamSize');
        this.industrySelect = document.getElementById('industry');
        this.currentCostsInput = document.getElementById('currentCosts');
        this.calculateButton = document.getElementById('calculateROI');
        
        // Results elements
        this.annualSavingsElement = document.getElementById('annualSavings');
        this.timeSavingsElement = document.getElementById('timeSavings');
        this.auditSavingsElement = document.getElementById('auditSavings');
        this.violationSavingsElement = document.getElementById('violationSavings');
    }

    bindEvents() {
        this.calculateButton.addEventListener('click', () => this.calculateROI());
        this.teamSizeSelect.addEventListener('change', () => this.calculateROI());
        this.industrySelect.addEventListener('change', () => this.calculateROI());
        this.currentCostsInput.addEventListener('input', () => this.calculateROI());
    }

    calculateInitialROI() {
        this.calculateROI();
    }

    calculateROI() {
        const teamSize = parseInt(this.teamSizeSelect.value);
        const industry = this.industrySelect.value;
        const currentCosts = parseFloat(this.currentCostsInput.value) || 0;

        // Calculate savings based on team size and industry
        const savings = this.calculateSavings(teamSize, industry, currentCosts);
        
        // Update UI with results
        this.updateResults(savings);
        
        // Add animation to results
        this.animateResults();
    }

    calculateSavings(teamSize, industry, currentCosts) {
        // Base multipliers for different team sizes
        const teamMultipliers = {
            5: { time: 0.3, audit: 0.2, violation: 0.25 },
            25: { time: 0.6, audit: 0.5, violation: 0.6 },
            100: { time: 0.8, audit: 0.7, violation: 0.8 }
        };

        // Industry-specific risk factors
        const industryRiskFactors = {
            tech: { risk: 1.0, compliance: 0.8 },
            finance: { risk: 1.4, compliance: 1.2 },
            healthcare: { risk: 1.6, compliance: 1.4 },
            government: { risk: 1.8, compliance: 1.6 }
        };

        const teamMultiplier = teamMultipliers[teamSize] || teamMultipliers[25];
        const industryFactor = industryRiskFactors[industry] || industryRiskFactors.tech;

        // Calculate time savings (hours per developer per year)
        const baseTimeSavings = 80; // hours per developer per year
        const timeSavings = Math.round(teamSize * baseTimeSavings * teamMultiplier.time * industryFactor.compliance);

        // Calculate audit cost savings
        const baseAuditSavings = currentCosts * 0.3; // 30% of current costs
        const auditSavings = Math.round(baseAuditSavings * teamMultiplier.audit * industryFactor.risk);

        // Calculate violation prevention savings
        const baseViolationSavings = currentCosts * 0.4; // 40% of current costs
        const violationSavings = Math.round(baseViolationSavings * teamMultiplier.violation * industryFactor.risk);

        // Total annual savings
        const totalSavings = auditSavings + violationSavings;

        // Calculate hourly rate for time savings
        const avgHourlyRate = 75; // Average developer hourly rate
        const timeSavingsValue = Math.round(timeSavings * avgHourlyRate);

        return {
            timeSavings: {
                hours: timeSavings,
                value: timeSavingsValue
            },
            auditSavings: auditSavings,
            violationSavings: violationSavings,
            totalSavings: totalSavings + timeSavingsValue,
            currentCosts: currentCosts
        };
    }

    updateResults(savings) {
        // Format numbers with commas
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        };

        const formatNumber = (num) => {
            return new Intl.NumberFormat('en-US').format(num);
        };

        // Update annual savings
        this.annualSavingsElement.textContent = formatCurrency(savings.totalSavings);

        // Update breakdown
        this.timeSavingsElement.textContent = `${formatNumber(savings.timeSavings.hours)} hours/year (${formatCurrency(savings.timeSavings.value)})`;
        this.auditSavingsElement.textContent = formatCurrency(savings.auditSavings);
        this.violationSavingsElement.textContent = formatCurrency(savings.violationSavings);

        // Add color coding based on savings amount
        this.annualSavingsElement.className = 'result-amount';
        if (savings.totalSavings > 100000) {
            this.annualSavingsElement.classList.add('high-savings');
        } else if (savings.totalSavings > 50000) {
            this.annualSavingsElement.classList.add('medium-savings');
        } else {
            this.annualSavingsElement.classList.add('low-savings');
        }
    }

    animateResults() {
        // Add pulse animation to results
        const resultElements = [
            this.annualSavingsElement,
            this.timeSavingsElement,
            this.auditSavingsElement,
            this.violationSavingsElement
        ];

        resultElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'scale(1.05)';
                element.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }, index * 100);
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new ROICalculator();
});
