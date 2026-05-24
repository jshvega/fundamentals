1. At any moment, what **pieces of information** does the calculator need to remember?
R: Current entry, previous result (number), pending operator (the one waiting to apply to the result), latest operator (the one that just got pressed), state between presses (flag for whether the next digit replaces or appends).

2. When the user presses a **digit**, what changes?
R: If it comes after pressing an operator, the entry resets and the digit gets added to the current entry. If it comes after a digit, then the digit gets textually added to the current entry.

3. When the user presses an **operator** (+, −, ×, ÷), what changes?
R: If the operator is pressed after having pressed a digit, then this new operator will define whether or not the previously stored oparator and digits get computed. Regardless, a new entry will be created so the user can type a new number. If the operator is pressed after having pressed another operator, this will simply switch.

4. When the user presses **=**, what changes?
R: Operation gets settled (no furhter entries) and the calculator starts computing the latest entry againts the the stored value that comes before it. OR flush all pending operations in order.

5. When the user presses **decimal (.)**, what changes? What rule prevents `3.14.15`?
R: Entry's decimal boolean changes so that no further decimals can be added, and the entry is considered a decimal number. Once a new operator is selected, the boolean must reset.

6. What's the difference between **AC** (all clear) and **C** (clear current entry)?
R: AC will fully reset the calculator and will start from abolute zero. C only clears the current entry, while remembering the previous ones in the operation.

7. **Order of operations:** if the user types `5 + 3 × 2 =`, the answer must be `11`, not `16`. How will you remember the `+ 5` while computing `3 × 2`? 
R: In this case, if the 3 is followed by a + or - operator, then 5+3 will be computed and the current entry will be the follow up to 8, not 5+3. On the other hand, if 3 is followed by a * or / operator, 5+3 will NOT compute; the compute will come once, in this case, 2 is submitted as an entry, then we can compute all three digits from right to left. So, it's not a matter of rememering per se, but rather, of deciding when and what to compute once an operator gets submitted.
NOTE: one entry or operator can only be submitted once the next one comes, meaning that if the user types *, but then switches to +, the calculator will only submit said operator once the user starts typing digits, and only the submitted entry will be taken into account for computing.


TEST CASES - Sequence of operations after each entry/operator gets submitted. Note: take for granted that the entry will have to reset after every operator gets submitted.
`5 + 3 × 2 =`
- 5 / number gets stored
- + / operator stored, no pending operator, no compute needed 
- 3 / number stored, no pending operator (+ is the current/latest, not pending), latest op is not eligible to compute yet, no compute needed
- * / operator stored, + is now the pending operator, pending operator's eligibility gets evaluated, pending operator is not eligible to compute yet because * is higher precedence
- 2 / number stored, pending operator gets resolved: will first compute latest instead, pending now becomes latest, 3*2 computes to 6
- = / operation gets settled, calculator will compute latest operator, 5+6 resolves to 11. Result now becomes the first number stored and cycle repeats, unbless AC/C are actioned 
`5 × 3 + 2.5 × 4 =`
- 5 / number gets stored
- * / operator stored, no pending operator, no compute needed 
- 3 / number stored, no pending operator, latest operator is eligible to compute yet, 5*3 computes, 15 is stored as latest result
- + / operator stored, this is the latest operator becuase * does not exist as 5*3 got replaced (computed) by 15
- 2 / *not submitted*
- . / *not submitted* this is now a decimal, deciamal boolean becomes True so that no more decimals can be added. Note: If AC/C gets actioned, boolean must rest to default (False)
- 5 / decimal number is stored, decimal boolean resets, latest operator (+) is not eligible to compute yet, no compute needed
- * / operator stored, + is now the pending operator, pending operator's eligibility gets evaluated, pending operator is not eligible to compute yet because * is higher precedence
- 4 / number stored, pending operator gets resolved: will first compute latest instead, 2.5*4 computes to 10, pending (+) now becomes latest
- = / operation gets settled, calculator will compute latest operator, 15+10 resolves to 25. Result now becomes the first number stored and cycle repeats, unbless AC/C are actioned