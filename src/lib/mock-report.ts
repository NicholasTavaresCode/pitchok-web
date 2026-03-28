import type { PitchReport } from "@/lib/report.types";

export const MOCK_REPORTS: Record<string, PitchReport> = {
  "1": {
    overallScore: 8.25,
    maxScore: 10,
    executiveSummary:
      "There is a critical, widespread, and urgent need within enterprises to democratize BigQuery data access for non-technical users — a need that existing solutions consistently fail to meet. The single most important insight is the severe bottleneck created by non-technical users' inability to query data directly, forcing costly reliance on data engineering teams.",
    researchFindings: {
      subredditsExplored: 10,
      threadsAnalyzed: 20,
      signalStrength: "strong",
      topSubreddits: [
        "r/dataengineering",
        "r/bigquery",
        "r/analytics",
        "r/BusinessIntelligence",
      ],
    },
    painPoints: [
      {
        title: "SQL Complexity & Lack of Skills",
        description:
          "Non-technical business users lack the SQL proficiency to query BigQuery directly, making self-service analytics impossible without intermediaries.",
        evidenceStrength: "HIGH",
        quote:
          "They often need specific data points or custom reports that aren't available in Looker, and they don't have the SQL skills to query BigQuery directly.",
        quoteSource: "s_a_m_u_e_l · r/dataengineering",
        classification: "Painkiller",
      },
      {
        title: "Data Access Bottlenecks & Slow Decision-Making",
        description:
          "Reliance on data teams for ad-hoc queries creates significant delays in retrieving insights, directly hindering business agility and decision-making speed.",
        evidenceStrength: "HIGH",
        quote:
          "This creates a bottleneck. Business users have to wait for me to get them the data, which slows down their decision-making.",
        quoteSource: "s_a_m_u_e_l · r/dataengineering",
        classification: "Painkiller",
      },
      {
        title: "Burden on Data Teams",
        description:
          "Data engineers and analysts spend a disproportionate amount of time fulfilling ad-hoc data requests, diverting them from higher-value core responsibilities like pipeline development.",
        evidenceStrength: "HIGH",
        quote:
          "My main responsibility is to build and maintain data pipelines… However, I spend a significant amount of my time fulfilling ad-hoc data requests from business users. I've heard it described as a 'necessary evil'.",
        quoteSource: "s_a_m_u_e_l & Beneficial-Flow-2105 · r/dataengineering",
        classification: "Painkiller",
      },
      {
        title: "Ineffectiveness of Traditional BI Tools & SQL Training",
        description:
          "Existing BI tools like Looker don't fully support ad-hoc queries outside of pre-built dashboards. SQL training for business users consistently fails due to a steep learning curve.",
        evidenceStrength: "MODERATE",
        quote:
          "I've tried to empower them with some basic SQL training… but it hasn't really worked. The learning curve is still too steep.",
        quoteSource: "s_a_m_u_e_l · r/dataengineering",
        classification: "Painkiller",
      },
      {
        title: "Security & Governance Concerns with Direct Access",
        description:
          "Granting non-technical users direct BigQuery access carries serious risks of data deletion, leaks, and high IT maintenance overhead — blocking adoption despite clear demand.",
        evidenceStrength: "WEAK",
        quote:
          "Directly authorizing access to this data via the BigQuery UI or Gemini CLI to individual users… carries large risks of data deletion or leaks.",
        quoteSource: "Beneficial-Flow-2105 · r/dataengineering",
        classification: "Painkiller",
      },
    ],
    competitors: [
      {
        name: "Manual SQL Querying by Data Teams",
        description:
          "Data engineers and analysts write custom SQL for business users on demand.",
        strengths: ["Provides specific, custom data when other tools fail"],
        weaknesses: [
          "Creates significant bottlenecks",
          "Slows decision-making",
          "Diverts data teams from core tasks",
        ],
        sentiment: "Highly negative from data teams; reluctant reliance from business users",
      },
      {
        name: "BI Tools (Looker, Tableau)",
        description:
          "Data visualization and dashboarding platforms with limited self-service capabilities.",
        strengths: [
          "Strong for pre-built reports and structured analysis",
          "Widely adopted in enterprises",
        ],
        weaknesses: [
          "Falls short for ad-hoc queries outside pre-built dashboards",
          "Still requires technical understanding to configure",
        ],
        sentiment: "Mixed — valued for structured reporting, insufficient for ad-hoc needs",
      },
      {
        name: "Basic SQL Training / Simplified Data Models",
        description:
          "Attempts to teach business users SQL basics or provide simplified views of the data.",
        strengths: ["Aims for long-term user self-sufficiency"],
        weaknesses: [
          "Steep learning curve for most business users",
          "Often unsuccessful, leading back to ad-hoc requests",
        ],
        sentiment: "Negative — often fails in practice",
      },
      {
        name: "BigAsk (Custom Internal Solution)",
        description:
          "A self-deployed web interface for natural language querying on BigQuery, built in-house.",
        strengths: [
          "Directly addresses non-technical user access",
          "Centralized management",
          "Simplified deployment",
        ],
        weaknesses: [
          "Requires internal development and ongoing maintenance",
          "Not a commercial product",
        ],
        sentiment: "Positive — seen as an effective solution to a clear pain point",
      },
      {
        name: "Dataki (AI Analytics Platform)",
        description:
          "AI analytics platform built on BigQuery, targeting self-serve insights for non-technical teams.",
        strengths: [
          "Directly targets non-technical teams",
          "Self-serve insights without SQL",
        ],
        weaknesses: [
          "New to market — specific limitations not yet widely known",
        ],
        sentiment: "Positive — seen as a promising emerging solution",
      },
      {
        name: "SkyPhrase (for Google Analytics)",
        description:
          "Natural language interface for Google Analytics API calls.",
        strengths: [
          "Demonstrates viability of NLQ for Google data products",
        ],
        weaknesses: [
          "Does not eliminate the need for data literacy entirely",
          "Scoped to Google Analytics, not BigQuery",
        ],
        sentiment: "Positive — seen as a 'neat idea' with proven concept",
      },
    ],
    differentiationOpportunities: [
      {
        title: "Truly Zero-Training Natural Language Interface",
        gap: "Users explicitly want a tool that requires virtually no training. The 'steep learning curve' of even simplified SQL or BI tools remains a critical barrier.",
        evidence:
          '"The learning curve is still too steep for many, and they prefer to just ask me." — s_a_m_u_e_l, r/dataengineering',
        howToExploit:
          "Focus relentlessly on intuitive UX and robust NLQ that handles ambiguity and complex queries without users needing to understand data models or SQL. Treat the interface as a search engine, not a query builder.",
        rating: "HIGH",
      },
      {
        title: "Addressing the 'Last Mile' for Non-Technical Users",
        gap: "All existing BI tools still require technical setup or pre-built dashboards, failing the 80% of business users who are data consumers rather than producers.",
        evidence:
          '"They often need specific data points or custom reports that aren\'t available in Looker, and they don\'t have the SQL skills to query BigQuery directly." — s_a_m_u_e_l',
        howToExploit:
          "Position the solution as the ultimate 'last mile' tool specifically designed for data consumers. Emphasize direct, unassisted access to BigQuery insights with zero configuration required.",
        rating: "HIGH",
      },
      {
        title: "Freeing Data Teams from Ad-Hoc Request Burden",
        gap: "The most prevalent workaround is business users asking data engineers to run queries, creating significant burden and highlighting the failure of existing self-service options.",
        evidence:
          '"I spend a significant amount of my time fulfilling ad-hoc data requests from business users… And I get pulled away from my core data engineering tasks." — s_a_m_u_e_l',
        howToExploit:
          "Market directly to data engineering and IT leaders. Emphasize how the solution frees their teams from 'necessary evil' tasks. Quantify time savings and efficiency gains to build the ROI case.",
        rating: "HIGH",
      },
      {
        title: "Intelligent Semantic Layer Integration",
        gap: "NLQ tools would be significantly more accurate with a semantic layer or data dictionary that maps business terminology to data model fields, reducing query ambiguity.",
        evidence:
          '"Interesting idea and relates to my current project but I also have a data dictionary. Did you integrate something like that along with it?" — SoggyGrayDuck, r/dataengineering',
        howToExploit:
          "Build robust capabilities for integrating with or automatically inferring a semantic layer from BigQuery schemas, allowing the NLQ engine to understand business terms and common metrics.",
        rating: "MEDIUM",
      },
      {
        title: "Enterprise-Grade Security Without Sacrificing Usability",
        gap: "Existing solutions either lack ease of use for business users or pose serious security risks when direct BigQuery access is granted without proper controls.",
        evidence:
          '"Directly authorizing access to this data… carries large risks of data deletion or leaks." — Beneficial-Flow-2105, r/dataengineering',
        howToExploit:
          "Design the platform with granular role-based access control, audit logging, and SSO from day one. Position enterprise security as a first-class feature — the reason large organizations can adopt without IT pushback.",
        rating: "HIGH",
      },
    ],
    marketPositionSummary:
      "The market for BigQuery natural language interfaces is crowded but fragmented. While many BI tools offer some self-service capabilities, none achieve true ad-hoc natural language querying at the enterprise level. There is no clear market leader specifically for BigQuery NLQ, creating a significant window of opportunity. Emerging competitors like Dataki and custom solutions like BigAsk validate the market exists — the presence of competition is a positive signal, not a deterrent.",
    scorecard: [
      { dimension: "Problem-Solution Fit", score: 9, weight: 0.30, weightedScore: 2.70 },
      { dimension: "Market Demand", score: 9, weight: 0.25, weightedScore: 2.25 },
      { dimension: "Competitive Advantage", score: 8, weight: 0.20, weightedScore: 1.60 },
      { dimension: "Feasibility & Reality Check", score: 7, weight: 0.20, weightedScore: 1.40 },
      { dimension: "Risk Assessment", score: 6, weight: 0.05, weightedScore: 0.30 },
    ],
    risks: [
      {
        title: "Accuracy & Reliability of NL-to-SQL Translation",
        likelihood: "High",
        description:
          "Consistently translating natural language into correct, optimized SQL for diverse and evolving enterprise BigQuery schemas is the primary technical challenge. Ambiguity in language or complex data models can produce incorrect insights, eroding user trust quickly.",
        mitigation:
          "Invest heavily in LLM research focused on semantic understanding and schema-aware query generation. Implement robust testing frameworks, user feedback loops for query refinement, and a 'human-in-the-loop' validation option for complex queries in early deployments.",
      },
      {
        title: "Competitive Landscape Evolution",
        likelihood: "Moderate",
        description:
          "Existing BI giants (Google Looker, Tableau, Power BI) are actively enhancing NLQ capabilities. Well-funded AI-native startups are also entering the space. The market could be dominated by a major player before significant traction is gained.",
        mitigation:
          "Focus on deep integration and optimization specifically for BigQuery, leveraging its unique features. Differentiate through zero-training UX, semantic layer support, and enterprise security — areas where large incumbents move slowly.",
      },
      {
        title: "Enterprise Adoption & Integration Complexity",
        likelihood: "Moderate",
        description:
          "Selling into large enterprises involves long sales cycles, complex security reviews, and significant integration effort with existing data governance, identity management, and data catalog systems.",
        mitigation:
          "Build SSO, RBAC, audit logging, and API-first design from the outset. Build strong Google Cloud partnership. Lead with clear ROI evidence (hours saved per data engineer, faster decision cycles) to convert key stakeholders.",
      },
    ],
    pivots: [
      {
        title: "Prioritize Semantic Layer Integration",
        description:
          "Instead of just NL-to-SQL, integrate a robust semantic layer or data dictionary capability. This directly addresses user requests and significantly improves NLQ accuracy by providing business context, reducing ambiguity, and making the tool reliable for complex enterprise data.",
      },
      {
        title: "Focus on 'Zero-Training' UX for Business Users",
        description:
          "While the underlying technology is complex, the user experience must be as intuitive as a search engine — requiring no prior knowledge of data structures or SQL. This directly tackles the 'steep learning curve' pain point that causes existing solutions to fail at adoption.",
      },
      {
        title: "Emphasize Burden Reduction for Data Teams",
        description:
          "Position the product not just as a business user tool, but as a critical solution for data engineers to offload ad-hoc requests. Highlight query optimization, audit trails, and controlled access. Tap into the 'necessary evil' frustration to make data teams internal champions.",
      },
      {
        title: "Intelligent Result Presentation",
        description:
          "Beyond raw query results, implement smart visualization and summarization. Users want results that 'look pretty' and are 'easily understandable.' Automatically suggest appropriate charts, provide natural language summaries, and enable easy export — reducing the need for further analyst intervention.",
      },
    ],
    useCases: [
      {
        title: "Marketing Campaign Performance Analysis",
        demand: "High Demand",
        whoItServes: "Marketing Managers, Analysts, Executives",
        problemItSolves:
          "Marketing teams need quick, ad-hoc answers about campaign performance (e.g. 'What were our top 5 campaigns by ROI last quarter?') but currently depend on data teams or struggle with BI tools for non-standard queries.",
        whyItWouldWork:
          "Directly addresses the 'last mile' problem for non-technical users. Marketers get real-time, specific answers without SQL, accelerating campaign optimization cycles from days to minutes.",
      },
      {
        title: "Sales Performance Deep Dive",
        demand: "High Demand",
        whoItServes: "Sales Directors, Regional Managers, Sales Operations",
        problemItSolves:
          "Sales leaders need granular data on trends, underperforming regions, and customer churn (e.g. 'What was the average deal size for enterprise clients in EMEA last month?') with no practical self-service path today.",
        whyItWouldWork:
          "Empowers sales teams with immediate, granular data access. Reduces reliance on data analysts for standard-but-not-pre-built reports, enabling faster strategic adjustments.",
      },
      {
        title: "Financial Reporting & Anomaly Detection",
        demand: "Medium Demand, High Value",
        whoItServes: "Finance Analysts, Controllers, CFOs",
        problemItSolves:
          "Finance teams need to quickly pull specific metrics, reconcile data, or investigate discrepancies (e.g. 'Identify any unusual spending patterns in our operational budget for Q2') — currently manual and slow.",
        whyItWouldWork:
          "Rapid self-service access to critical financial data reduces time on manual extraction and enables quicker identification of anomalies, compressing audit and reporting cycles significantly.",
      },
    ],
    nextSteps: [
      "Deep-dive into enterprise data governance requirements by engaging directly with IT and data leaders to understand security, compliance, and integration needs before building.",
      "Develop an MVP focused on a single, well-defined BigQuery schema (e.g. marketing analytics or sales data) within one pilot enterprise client to validate the core NL-to-SQL engine and UX rapidly.",
      "Recruit a founding team with strong AI/ML and data warehousing expertise — the accuracy risk (#1 risk) requires top-tier talent in both NLP/LLMs and BigQuery engineering.",
      "Engage directly with the r/dataengineering and r/bigquery communities to share early concepts, solicit feedback, and identify design partners from this highly active and relevant audience.",
      "Map out a semantic layer integration strategy — research and plan how the platform will ingest, manage, or infer metadata and business definitions to enhance NLQ accuracy from day one.",
    ],
    additionalSources: [
      { title: "Looking for feedback on a self-deployed web interface for exploring BigQuery data", url: "https://www.reddit.com/r/dataanalysis/comments/1qv2ukw/looking_for_feedback_on_a_selfdeployed_web/", subreddit: "r/dataanalysis" },
      { title: "Current natural language automation tool thoughts", url: "https://www.reddit.com/r/SaaS/comments/1qi9zjt/current_natural_language_automation_tool_thoughts/", subreddit: "r/SaaS" },
      { title: "10 tips for self-service analytics with Google BigQuery and Tableau", url: "https://www.reddit.com/r/bigquery/comments/focj40/10_tips_for_selfservice_analytics_with_google/", subreddit: "r/bigquery" },
      { title: "Self-Service Analytics on BigQuery", url: "https://www.reddit.com/r/bigquery/comments/cyz6dt/selfservice_analytics_on_bigquery/", subreddit: "r/bigquery" },
      { title: "zulily's top 10 tips for self-service analytics with Google BigQuery and Tableau", url: "https://www.reddit.com/r/bigquery/comments/8f3k1k/zulilys_top_10_tips_for_selfservice_analytics/", subreddit: "r/bigquery" },
      { title: "Why zulily created a self-service marketing analytics platform with Tableau and Google BigQuery", url: "https://www.reddit.com/r/bigquery/comments/8eygif/why_zulily_created_a_selfservice_marketing/", subreddit: "r/bigquery" },
      { title: "The switch to self-service marketing analytics at zulily: best practices for using Tableau with BigQuery", url: "https://www.reddit.com/r/bigquery/comments/84sxjr/the_switch_to_selfservice_marketing_analytics_at/", subreddit: "r/bigquery" },
      { title: "The Open-Source Self-Service Analytics Platform is here!", url: "https://www.reddit.com/r/owox/comments/1mieo0r/the_opensource_selfservice_analytics_platform_is/", subreddit: "r/owox" },
      { title: "I built a self hosted real-time analytics service in Go (using DuckDB)", url: "https://www.reddit.com/r/golang/comments/1ppo667/i_built_a_self_hosted_realtime_analytics_service/", subreddit: "r/golang" },
      { title: "What alternatives are there to FileMaker?", url: "https://www.reddit.com/r/filemaker/comments/1p1lfu0/what_alternatives_are_there_to_filemaker/", subreddit: "r/filemaker" },
      { title: "Tools & Info for SysAdmins — Mega Summary (85 Items)", url: "https://www.reddit.com/r/sysadmin/comments/9ir451/tools_info_for_sysadmins_mega_summary_85_items/", subreddit: "r/sysadmin" },
      { title: "Spring '26 Release Notes — Abridged Edition by SFXD", url: "https://www.reddit.com/r/salesforce/comments/1qebvlr/spring26_release_notes_abridged_edition_by_sfxd/", subreddit: "r/salesforce" },
      { title: "Still Using Emacs in 2025? Yes — And Here's Why", url: "https://www.reddit.com/r/emacs/comments/1niadv5/still_using_emacs_in_2025_yes_and_heres_why/", subreddit: "r/emacs" },
      { title: "I built this AI Automation to write viral TikTok/IG video scripts (1.8M views)", url: "https://www.reddit.com/r/n8n/comments/1loafvx/i_built_this_ai_automation_to_write_viral/", subreddit: "r/n8n" },
      { title: "I gave Claude these 4 MCPs and now he's my HEAD OF MARKETING", url: "https://www.reddit.com/r/n8n/comments/1qi2nf4/i_gave_claude_these_4_mcps_and_now_hes_my_head_of/", subreddit: "r/n8n" },
      { title: "We Didn't Know What We Didn't Know: Standing Up Enterprise AI Services at Scale", url: "https://www.reddit.com/r/ArtificialInteligence/comments/1r87afj/we_didnt_know_what_we_didnt_know_standing_up/", subreddit: "r/ArtificialInteligence" },
      { title: "DeepSeek Presents 'Engram': Conditional Memory via Scalable Lookup", url: "https://www.reddit.com/r/mlscaling/comments/1qbken0/deepseek_presents_engram_conditional_memory_via/", subreddit: "r/mlscaling" },
      { title: "250+ applications, 0 responses overall. How can I improve my resume", url: "https://www.reddit.com/r/FAANGrecruiting/comments/1ow7k2u/250_applications_0_responses_overall_how_can_i/", subreddit: "r/FAANGrecruiting" },
      { title: "T15 MBA grad w/ 6yrs PM exp — 400 apps later, no offers. Normal?", url: "https://www.reddit.com/r/MBA/comments/1n9npzz/t15_mba_grad_w_6yrs_pm_exp_400_apps_later_no/", subreddit: "r/MBA" },
      { title: "Here's a list of 221 free online programming/CS courses (MOOCs) with feedback", url: "https://www.reddit.com/r/learnprogramming/comments/3zfbp1/heres_a_list_of_221_free_online_programmingcs/", subreddit: "r/learnprogramming" },
    ],
    keySources: [
      {
        title: "Feedback on a self-deployed web interface for exploring BigQuery data using natural language",
        url: "https://www.reddit.com/r/dataengineering/comments/1quz6kq/looking_for_feedback_on_a_selfdeployed_web/",
        subreddit: "r/dataengineering",
      },
      {
        title: "Natural language command interface for Google Analytics",
        url: "https://www.reddit.com/r/analytics/comments/1nmfj5/natural_language_command_interface_for_google/",
        subreddit: "r/analytics",
      },
      {
        title: "Giving away free $10k+ BI consulting packages to BigQuery users (testing new AI analytics tool)",
        url: "https://www.reddit.com/r/bigquery/comments/1oe1ax1/giving_away_free_10k_bi_consulting_packages_to/",
        subreddit: "r/bigquery",
      },
    ],
  },
};
