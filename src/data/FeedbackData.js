// feedbackData.js
export const feedbackData = {
    "10일": {
        summary: {
            totalScore: 76,
            grade: "양호",
            totalQuestions: 4,
            totalTime: "7분 50초",
            mistakes: "2개",
            averageTimePerQuestion: "1분 57초",
        },
        radarChart: {
            태도: 80,
            학업역량: 70,
            적극성: 75,
            표현력: 60,
            의사소통능력: 65,
        },
        feedbackDetails: [
            { category: "태도", score: "양호", description: "긍정적인 태도를 보였지만, 자세가 약간 긴장된 모습이 관찰되었습니다." },
            { category: "학업 역량", score: "보통", description: "학업 관련 질문에서 일부 답변이 부족한 점이 있었습니다." },
            { category: "적극성", score: "양호", description: "적극적으로 대화에 참여하며 자신의 의견을 명확히 전달했습니다." },
            { category: "표현력", score: "부족", description: "표현력이 부족하여 답변 전달력이 다소 낮았습니다." },
            { category: "의사소통 능력", score: "보통", description: "의사소통 능력이 전반적으로 양호하였으나, 개선이 필요합니다." },
        ],
    },
    "12일": {
        summary: {
            totalScore: 82,
            grade: "우수",
            totalQuestions: 5,
            totalTime: "9분 10초",
            mistakes: "1개",
            averageTimePerQuestion: "1분 50초",
        },
        radarChart: {
            태도: 85,
            학업역량: 80,
            적극성: 88,
            표현력: 75,
            의사소통능력: 78,
        },
        feedbackDetails: [
            { category: "태도", score: "우수", description: "자신감 있고 긍정적인 태도를 보이며 면접을 잘 이끌었습니다." },
            { category: "학업 역량", score: "우수", description: "학업과 관련된 질문에 명확하고 정확한 답변을 제공했습니다." },
            { category: "적극성", score: "우수", description: "적극적으로 면접에 참여하며 긍정적인 인상을 남겼습니다." },
            { category: "표현력", score: "양호", description: "표현력이 전반적으로 좋았지만, 일부 전달력이 부족했습니다." },
            { category: "의사소통 능력", score: "양호", description: "적절히 상호작용했지만, 청중의 반응을 더 잘 파악할 필요가 있습니다." },
        ],
    },
};
